// Libraries
import { Component, inject, signal } from '@angular/core';

// Components
import { FileUploadComponent } from './file-upload.component';
import { PreviewComponent } from './preview.component';
import { ResultComponent } from './result.component';

// Services
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FileUploadComponent, PreviewComponent, ResultComponent],
  template: `
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-semibold text-center mb-4">MP4 to GIF Converter</h2>
      <app-file-upload (fileSelected)="setFile($event)"></app-file-upload>
      @if (file()){
        <app-preview [file]="file()!"></app-preview>
        <button 
            (click)="convertToGif()" 
            class="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
            Convert to GIF
        </button>
      }

      @if (convertedFile()) {
        <app-result [convertedFile]="convertedFile()!"></app-result>
      }
    </div>
  `,
})
export class ConverterComponent {
    apiService = inject(ApiService);
    file = signal<File | null>(null);
    convertedFile = signal<string | null>(null);
    isUploading = false;

    setFile(selectedFile: File) {
        this.file.set(selectedFile);
    }

    async convertToGif() {
        this.isUploading = true;

        const data = await this.apiService.convertVideo(this.file()!);
        if (data?.success) this.convertedFile.set(data?.url);
        this.isUploading = false;
    }
}
