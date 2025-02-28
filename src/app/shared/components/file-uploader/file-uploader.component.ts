import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    standalone: true
})
export class FileUploaderComponent {
    @Output() fileSelected = new EventEmitter<File>();
    
    onDragOver(event: DragEvent) {
        event.preventDefault();
    }
    
    onDrop(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer?.files.length) {
            this.fileSelected.emit(event.dataTransfer.files[0]);
        }
    }
    
    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files?.length) {
            this.fileSelected.emit(target.files[0]);
        }
    }
}
