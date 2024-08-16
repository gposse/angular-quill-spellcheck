import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from "./editor/editor.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EditorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quill-test';
}
