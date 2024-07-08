import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, MinLengthValidator, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutes } from 'src/app/core/constants/constant.routes';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { ContactModalComponent } from 'src/app/shared/layouts/contact-modal/contact-modal.component';

@Component({
  selector: 'app-tutor-contact',
  templateUrl: './tutor-contact.page.html',
  styleUrls: ['./tutor-contact.page.scss'],
  standalone: true,
  imports: [ 
    SharedModule
  ]
})
export class TutorContactPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  appRoutes = AppRoutes;
  //@ViewChild("ionModal", { static: true}) modal!: IonModal;
  
  
  constructor(
    private modalControl: ModalController
  ) {
    addIcons({
      add
    })
  }

  ngOnInit() {
  }

  async openContactModal(){
    const contactModal = await this.modalControl.create({
      component: ContactModalComponent
    })

    return await contactModal.present();
  }

}
