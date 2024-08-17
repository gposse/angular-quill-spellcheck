import nspell from 'nspell'
import Quill from 'quill'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export interface Config {
  aff: string
  dic: string
  container: string
  contentContainer: string
}

export interface QuillInstance {
  on: any
  getText: any
}

export default class SpellChecker {
  quill: QuillInstance
  options: Config
  spell: any

  constructor(quill: Quill, options: any) {
    this.quill = quill
    this.options = options

    this.spell = nspell(this.options.aff, this.options.dic);
    const container = document.querySelector(this.options.container)

    this.quill.on('text-change', () => {
      const misspelledWords = this.spellCheck()
      container!.innerHTML = misspelledWords.length + ' errores';
      this.addTags(misspelledWords);
//      console.log('Misspelled words:', misspelledWords);
    })
  }

  addTags(misspelledWords: string[]) {
    const quill = this.quill as Quill;
    const delta = quill.getContents();
    const html = (delta);
    const converter = new QuillDeltaToHtmlConverter(html.ops, {});
    let innerHtml = converter.convert();
    const container = document.querySelector(this.options.contentContainer);
    for (let word of misspelledWords) {
      if (word.length>1) {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const replacement = `<span class="misspelled">${word}</span>`;
        innerHtml = innerHtml.replace(regex, replacement);
      }
    }
    if (container) {
      container.innerHTML = innerHtml;
    }
  }

  cleanTags() {
    const container = document.querySelector(this.options.contentContainer);
    const quill = this.quill as Quill;
    let range:any = quill.getSelection();
    const innerHtml = quill.root.innerHTML;
    const cleanHtml = innerHtml.replace(/<span class="misspelled"[^>]*>/g, '').replace(/<\/span>/g, '');
    quill.root.innerHTML = cleanHtml;
    quill.setSelection(range);
  }

  spellCheck() {
    const text = this.quill.getText().trim()

    const words = text.split(/\s+|[^a-zA-ZÁÉÍÓÚÑáéíóúñ]+/);

    const misspelled = [];
  
    for (let word of words) {
      const lcWord = word.toLowerCase().replace(/[^a-záéíóúñ]/g, '');
      const isCorrect = this.spell.correct(lcWord);
      if (!isCorrect) {
        misspelled.push(word);
      }
    }
  
    return misspelled;  
  }
}
