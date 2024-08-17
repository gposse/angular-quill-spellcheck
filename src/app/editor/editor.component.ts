import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import Quill from 'quill';
import { QuillEditorComponent } from 'ngx-quill';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import WordCounter from '../word-counter';
import SpellChecker from '../spellchecker';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    QuillEditorComponent
  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {
  private quill!: Quill;

  editorConfig = {
    theme: 'snow',
    placeholder: 'Inicie su entrada...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['clean']
      ],
      counter: {
        unit: 'word',
        container: '#wordCounter',
      },
      spellchecker: {
        aff: '',
        dic: '',
        container: "#spellCheck",
        contentContainer: "#spellCheckContent"
      }
    }
  };

  constructor(
    private http: HttpClient
  ) {
  }

  async ngOnInit() {
    Quill.register('modules/counter', WordCounter);
    Quill.register('modules/spellchecker', SpellChecker);
    this.editorConfig.modules.spellchecker.aff = await firstValueFrom(this.http.get('assets/dictionaries/es-CO/index.aff', { responseType: 'text' }));
    this.editorConfig.modules.spellchecker.dic = await firstValueFrom(this.http.get('assets/dictionaries/es-CO/index.dic', { responseType: 'text' }));
    this.quill = new Quill('#editor', this.editorConfig);
  }

  async save() {
    const content = this.quill.root.innerHTML;
    console.log(content);
  }

  spellCheckStatus() {
    const spellCheckDiv = document.getElementById('spellCheckStatus');
    const modal = document.getElementById('modal');
    const popupContent = document.getElementById('popupContent');
    const spellCheckContent = document.getElementById('spellCheckContent');
  
    if (spellCheckDiv && modal && popupContent && spellCheckContent) {
      popupContent.innerHTML = spellCheckContent.innerHTML;
      modal.style.display = 'block';
  
      document.getElementById('closePopup')?.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }
}
