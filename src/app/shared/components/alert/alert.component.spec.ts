// Libraries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

// Components
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AlertComponent, CommonModule ],  // Import standalone component here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct message', () => {
    component.message = 'This is a success message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.alert').textContent).toContain('This is a success message');
  });

  it('should apply success class when type is success', () => {
    component.message = 'Success';
    component.type = 'success';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.alert').classList).toContain('bg-green-100');
    expect(compiled.querySelector('.alert').classList).toContain('text-green-800');
  });

  it('should apply error class when type is error', () => {
    component.message = 'Error';
    component.type = 'error';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.alert').classList).toContain('bg-red-100');
    expect(compiled.querySelector('.alert').classList).toContain('text-red-800');
  });

  it('should apply info class when type is info', () => {
    component.message = 'Info';
    component.type = 'info';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.alert').classList).toContain('bg-blue-100');
    expect(compiled.querySelector('.alert').classList).toContain('text-blue-800');
  });

  it('should call closeAlert and clear the message when close button is clicked', () => {
    component.message = 'This is a message';
    component.type = 'error';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const closeButton = compiled.querySelector('button');
    closeButton.click();
    fixture.detectChanges();
    expect(component.message).toBe('');
    const alertElement = compiled.querySelector('.alert');
    expect(alertElement).toBeNull();  // The alert should no longer be in the DOM
  });

  it('should not display the alert if message is empty', () => {
    component.message = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.alert')).toBeNull();  // No alert should be rendered
  });
});
