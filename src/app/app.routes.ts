import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "", loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'pets',
    loadChildren: () => import('./pages/pets/pets.routes').then( m => m.routes)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./pages/account/accounts.routes').then( m => m.routes)
  },
  {
    path: 'tutor-vet',
    loadComponent: () => import('./pages/tutor-vet/tutor-vet.page').then( m => m.TutorVetPage)
  },
  
  
  
];
