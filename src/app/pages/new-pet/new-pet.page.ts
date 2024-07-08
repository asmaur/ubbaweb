import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonModal, IonDatetime, IonDatetimeButton, IonAlert, IonText } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutes } from 'src/app/core/constants/constant.routes';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.page.html',
  styleUrls: ['./new-pet.page.scss'],
  standalone: true,
  imports: [IonText, IonAlert, IonDatetimeButton, IonDatetime, IonModal, IonInput, 
    SharedModule
  ]
})
export class NewPetPage implements OnInit {
  appRoutes = AppRoutes;
  

  constructor() { }

  ngOnInit() {
  }

}
