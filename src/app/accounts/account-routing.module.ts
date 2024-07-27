import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: "",
      // component: AccountPage,
      children: [
          {
              path: 'contacts',
              loadComponent: () => import('./tutor-contact/tutor-contact.page').then( m => m.TutorContactPage),
              pathMatch: "full"
          },
          {
            path: 'tutors',
            loadComponent: () => import('./tutor/tutor.page').then( m => m.TutorPage),
            pathMatch: "full"
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
