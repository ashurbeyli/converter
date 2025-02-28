import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-video-previewer',
    standalone: true,
    templateUrl: './video-previewer.component.html'
})
export class VideoPreviewerComponent {
    @Input() file!: File;
    
    get videoUrl() {
        return this.file ? URL.createObjectURL(this.file) : '';
    }
}