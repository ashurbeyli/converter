import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  standalone: true,
  template: `
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Preview:</h3>
      @if (file) {
        <video controls class="w-full rounded-lg shadow">
          <source [src]="videoUrl" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      }
    </div>
  `,
})
export class PreviewComponent {
  @Input() file!: File;
  
  get videoUrl() {
    return this.file ? URL.createObjectURL(this.file) : '';
  }
}