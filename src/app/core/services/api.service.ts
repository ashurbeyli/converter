import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
    // TODO: use from env variables
    baseUrl = 'http://localhost:4200/api';

    async convertVideo(file: File): Promise<any> {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(this.baseUrl + '/convert-video', {
            method: 'POST',
            body: formData
        });

        return (await response.json()) ?? [];
    }

    async getConversionStatus(jobId: string) {
        const response = await fetch(`${this.baseUrl}/convert-video/status/${jobId}`, {
            method: 'GET'
        });

        return (await response.json()) ?? [];
    }
}