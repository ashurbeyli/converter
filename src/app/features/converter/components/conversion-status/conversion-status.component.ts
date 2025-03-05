import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ResultComponent } from "./components/result/result.component";

// Services
import { ApiService } from '../../../../core/services/api.service';

@Component({
    selector: 'app-conversion-status',
    templateUrl: './conversion-status.component.html',
    imports: [ResultComponent, CommonModule]
})
export class ConversionStatusComponent implements OnInit {
    @Input() job: any = null;
    apiService = inject(ApiService);
    
    ngOnInit() {
        if (this.job?.id) { this.pollConversionStatus(); }
    }
    
    async pollConversionStatus() {
        try {
            const response = await this.apiService.getConversionStatus(this.job?.id);
            this.job = response?.data;
            if (!['completed', 'failed'].includes(response?.data?.status)) {
                this.pollConversionStatus();
            }
        } catch (error: any) {
            setTimeout(() => this.pollConversionStatus(), 5000);
        }
    }
}
