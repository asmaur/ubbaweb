import { Routes } from "@angular/router";
import { PetsPage } from "./pets.page";
import { AppRoutes } from "src/app/core/constants/constant.routes";

export const routes: Routes = [
    {
        path: "",
        //component: PetsPage,
        children: [
            {
                path: AppRoutes.pets.scan,
                loadComponent: () => import('../qrcode/qrcode.page').then((m) => m.QrcodePage ) ,
                pathMatch: "full"
            },            
            {
                path: 'new',
                loadComponent: () => import('../new-pet/new-pet.page').then( m => m.NewPetPage),
                pathMatch: "full"
            },
            {
                path: AppRoutes.pets.profile,
                loadComponent: () => import('../pet-profile/pet-profile.page').then((m) => m.PetProfilePage ),
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
]