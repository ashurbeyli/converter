import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'converter', pathMatch: 'full' },
    { path: 'converter', loadChildren: () => import('./features/converter/converter.routes').then(m => m.CONVERTER_ROUTES) },
    { path: '**', redirectTo: 'converter' },
];
