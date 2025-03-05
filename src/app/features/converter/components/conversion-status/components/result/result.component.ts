import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-result',
    standalone: true,
    providers: [
        provideImgixLoader('http://localhost:4200/uploads/'),
    ],
    template: `
    <div class="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
    <h3 class="font-semibold text-gray-800 mb-2">Converted Gif:</h3>
    <div class="text-center">
    <img ngSrc={{convertedFile}} width="300" height="300" alt="Converted GIF" class="mt-2 rounded-lg shadow-lg w-full"/>
    </div>
    </div>
    `,
    imports: [NgOptimizedImage]
})
export class ResultComponent {
    @Input() convertedFile!: string;
}
