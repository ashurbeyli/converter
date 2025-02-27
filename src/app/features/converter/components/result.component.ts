import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  providers: [
    provideImgixLoader('http://localhost:4200/uploads/'),
  ],
  template: `
    <div class="mt-4 text-center">
      <h3 class="text-lg font-semibold">Converted GIF:</h3>
      <img ngSrc={{convertedFile}} width="300" height="300" alt="Converted GIF" class="mt-2 rounded-lg shadow-lg w-full"/>
    </div>
  `,
  imports: [NgOptimizedImage]
})
export class ResultComponent {
  @Input() convertedFile!: string;
}
