import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    standalone: true,
    templateUrl: './alert.component.html',
    imports: [CommonModule]
})
export class AlertComponent {
    @Input() message: string = '';  // The error message
    @Input() type: 'success' | 'error' | 'info' = 'error';  // Type of alert (can be customized)
    
    // To close the alert
    closeAlert() {
        this.message = '';
    }
}
