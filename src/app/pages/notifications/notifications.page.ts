import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
  standalone: true,
  imports: [IonHeader, 
    SharedModule,
    ],
})
export class NotificationsPage {
  constructor() {}
}
