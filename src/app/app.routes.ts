import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'geo',
    pathMatch: 'full',
  },
  {
    path: 'geo',
    loadComponent: () => import('./geo/geo.component').then(c => c.GeoComponent),
  },
];
