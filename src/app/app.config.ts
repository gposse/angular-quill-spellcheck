import { ApplicationConfig } from '@angular/core';
import { provideQuillConfig } from 'ngx-quill';
import WordCounter from './word-counter';
import SpellChecker from './spellchecker';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),    
    provideQuillConfig({
      customModules: [
        {
          implementation: WordCounter,
          path: 'modules/counter'
        },
        {
          implementation: SpellChecker,
          path: 'modules/spellchecker'
        }
      ],
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
  }),
  ]
};

