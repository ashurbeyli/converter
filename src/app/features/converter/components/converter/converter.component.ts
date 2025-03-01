// Libraries
import { Component, inject, signal } from '@angular/core';

// Components
import { FileUploaderComponent } from '../../../../shared/components/file-uploader/file-uploader.component';
import { VideoPreviewerComponent } from '../../../../shared/components/video-previewer/video-previewer.component';
import { ResultComponent } from '../result/result.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

// Services
import { ApiService } from '../../../../core/services/api.service';

@Component({
    selector: 'app-converter',
    standalone: true,
    imports: [FileUploaderComponent, VideoPreviewerComponent, ResultComponent, AlertComponent, VideoPreviewerComponent],
    templateUrl: './converter.component.html'
})
export class ConverterComponent {
    apiService = inject(ApiService);
    file = signal<File | null>(null);
    convertedFile = signal<string | null>(null);
    isUploading = false;
    hasError = false;
    
    setFile(selectedFile: File) {
        this.file.set(selectedFile);
        // When user selects another file error or previous result disappears
        this.convertedFile.set(null);
        this.hasError = false;
    }
    
    async convertToGif() {
        this.isUploading = true;
        try {
            const data = await this.apiService.convertVideo(this.file()!);
            if (data?.success) {
                this.convertedFile.set(data?.file);
                this.file.set(null);
            } else {
                this.hasError = true;
            }
        } catch (error) {
            console.log(error);
            this.hasError = true; 
        }
        this.isUploading = false;
    }
}
