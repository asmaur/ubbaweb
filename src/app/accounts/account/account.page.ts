import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonNote } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { cameraOutline, listCircle, peopleOutline, personAddOutline } from 'ionicons/icons';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
  standalone: true,
  imports: [IonNote, 
    SharedModule
  ],
})
export class AccountPage {
  constructor() {
    addIcons({listCircle, peopleOutline, cameraOutline})
  }
}
