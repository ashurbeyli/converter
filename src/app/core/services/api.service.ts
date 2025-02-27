import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  getData() {
    return 'Hello from Core Module!';
  }
}