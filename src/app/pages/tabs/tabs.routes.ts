import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AppRoutes } from 'src/app/core/constants/constant.routes';

export const routes: Routes = [
  {
    path: `${AppRoutes.tabnav.entry}`,
    component: TabsPage,
    children: [
      {
        path: AppRoutes.tabnav.home,
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
        pathMatch: "full"
      },
      {
        path: AppRoutes.tabnav.search,
        loadComponent: () =>
          import('../search/search.page').then((m) => m.SearchPage),pathMatch: "full"
      },
      {
        path: AppRoutes.tabnav.notifications,
        loadComponent: () =>
          import('../notifications/notifications.page').then((m) => m.NotificationsPage),
        pathMatch: "full"
      },
      {
        path: AppRoutes.tabnav.account,
        loadComponent: () =>
          import('../../accounts/account/account.page').then((m) => m.AccountPage),
        pathMatch: "full"
      },
      {
        path: "",
        redirectTo: `${AppRoutes.tabnav.entry}/${AppRoutes.tabnav.home}`,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: "",
    redirectTo: `${AppRoutes.tabnav.entry}/${AppRoutes.tabnav.home}`,
    pathMatch: 'full',
  },
];
