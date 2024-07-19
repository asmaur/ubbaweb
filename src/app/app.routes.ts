import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "", loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets-routing.module').then( m => m.PetRoutingModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/account-routing.module').then( m => m.AccountRoutingModule)
  },
  {
    path: 'tutor-vet',
    loadComponent: () => import('./pages/tutor-vet/tutor-vet.page').then( m => m.TutorVetPage)
  },
  
  
  
];
