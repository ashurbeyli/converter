import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploaderComponent } from './file-uploader.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('FileUploaderComponent', () => {
    let component: FileUploaderComponent;
    let fixture: ComponentFixture<FileUploaderComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FileUploaderComponent, CommonModule] // Import the standalone component
        }).compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should emit the selected file when a file is chosen through input', () => {
        spyOn(component.fileSelected, 'emit');
        const fileInput = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
        const file = new File(['test'], 'test.mp4', { type: 'video/mp4' });
        const event = new Event('change');
        Object.defineProperty(event, 'target', { value: { files: [file] } });
        
        fileInput.dispatchEvent(event);
        
        expect(component.fileSelected.emit).toHaveBeenCalledWith(file);
    });

    // TODO: add more test cases
});
