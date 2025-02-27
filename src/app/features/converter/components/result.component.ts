import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  template: `
    <div class="mt-4 text-center">
      <h3 class="text-lg font-semibold">Converted GIF:</h3>
      <img [src]="convertedFile" alt="Converted GIF" class="mt-2 rounded-lg shadow-lg w-full"/>
    </div>
  `,
})
export class ResultComponent {
  @Input() convertedFile!: string;
}
