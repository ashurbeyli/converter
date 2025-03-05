// Libraries
import { Component, inject, signal } from '@angular/core';

// Components
import { FileUploaderComponent } from '../../../../shared/components/file-uploader/file-uploader.component';
import { VideoPreviewerComponent } from '../../../../shared/components/video-previewer/video-previewer.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

// Services
import { ApiService } from '../../../../core/services/api.service';
import { ConversionStatusComponent } from "../conversion-status/conversion-status.component";

@Component({
    selector: 'app-converter',
    standalone: true,
    imports: [FileUploaderComponent, VideoPreviewerComponent, AlertComponent, VideoPreviewerComponent, ConversionStatusComponent],
    templateUrl: './converter.component.html'
})
export class ConverterComponent {
    apiService = inject(ApiService);
    file = signal<File | null>(null);
    isUploading = false;
    hasError = false;
    job = <any>(null);

    resetPreviousProcess() {
        this.job = null;
        this.hasError = false;
    }
    
    setFile(selectedFile: File) {
        this.file.set(selectedFile);
        this.resetPreviousProcess();
    }
    
    async convertToGif() {
        this.isUploading = true;
        try {
            const response = await this.apiService.convertVideo(this.file()!);
            if (response?.success) {
                this.file.set(null);
                this.job = response?.data;
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
