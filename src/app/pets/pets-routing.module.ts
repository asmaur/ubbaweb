import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../core/constants/constant.routes';

const routes: Routes = [
    {
        path: "",
        //component: PetsPage,
        children: [
            {
                path: AppRoutes.pets.scan,
                loadComponent: () => import('../pages/qrcode/qrcode.page').then((m) => m.QrcodePage ) ,
                pathMatch: "full"
            },            
            {
                path: 'new',
                loadComponent: () => import('../pets/new-pet/new-pet.page').then( m => m.NewPetPage),
                pathMatch: "full"
            },
            {
                path: AppRoutes.pets.profile,
                loadComponent: () => import('../pets/pet-profile/pet-profile.page').then((m) => m.PetProfilePage ),
                pathMatch: "full"
            },            
            {
                path: "",
                redirectTo: AppRoutes.tabnav.home,
                pathMatch: 'full',
            },
        ]
    },
    {
        path: "",
        redirectTo: AppRoutes.tabnav.home,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetRoutingModule { }
