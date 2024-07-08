import { Routes } from "@angular/router";
import { AppRoutes } from "src/app/core/constants/constant.routes";
import { AccountPage } from "./account.page";

export const routes: Routes = [
    {
        path: "",
        // component: AccountPage,
        children: [
            {
                path: 'contacts',
                loadComponent: () => import('../tutor-contact/tutor-contact.page').then( m => m.TutorContactPage),
                pathMatch: "full"
            }
        ]
    }
]