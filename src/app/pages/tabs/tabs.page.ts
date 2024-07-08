import { Component, EnvironmentInjector, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, home, settingsOutline, appsOutline, search, notifications, notificationsOutline } from 'ionicons/icons';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonTabs, IonTabButton } from "@ionic/angular/standalone";
import { AppRoutes } from 'src/app/core/constants/constant.routes';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  appRoutes = AppRoutes;

  constructor(
    
  ) {
    addIcons({ triangle, ellipse, square, home, settingsOutline, appsOutline, search , notifications, notificationsOutline});
  }
}
