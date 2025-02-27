import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  template: `
    <div 
      class="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:bg-gray-100"
      (drop)="onDrop($event)" 
      (dragover)="onDragOver($event)"
      (click)="fileInput.click()">
      <p class="text-gray-600">Drag & Drop MP4 File or Click to Select</p>
      <input type="file" #fileInput class="hidden" (change)="onFileSelected($event)" accept="video/mp4"/>
    </div>
  `,
})
export class FileUploadComponent {
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
