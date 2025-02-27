import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
    url = 'http://localhost:4200/api/convert-video';

    async convertVideo(file: File): Promise<any> {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(this.url, {
            method: 'POST',
            body: formData
        });

        return (await response.json()) ?? [];
    }
}