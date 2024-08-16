import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    QuillEditorComponent
  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  public placeholder = 'Enter text here...';

}
