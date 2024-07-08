import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core/components';
import { SharedModule } from '../../shared.module';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { JsonPipe } from '@angular/common';
import { ICountry, NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';
import { MaskitoElementPredicate, MaskitoOptions,} from '@maskito/core';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    NgxCountriesDropdownModule,
    IonicInputMaskModule,
  ]
})
export class ContactModalComponent  implements OnInit {
  protected formBuilder = inject(FormBuilder);
  preferredCountryCodes = ["br", "us"]

  readonly brPhoneMask: MaskitoOptions = {
    mask: [
      ...Array(2).fill(/\d/),
      ' ',
      ...Array(5).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/)
    ],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el: any) => (el as HTMLIonInputElement).getInputElement();

  
  contactForm =  this.formBuilder.group({
    name: [null, [Validators.required, Validators.min(4), Validators.maxLength(25)]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern("")]],
    mine: [false],
    social: [true],
    instagram: [null, [Validators.required,]],
    facebook: [null, [Validators.required]],
    tiktok: [null, [Validators.required]]
  })

  

  constructor(
    private modalControl: ModalController
  ) {
    addIcons({close})
  }

  ngOnInit() {}

  cancel() {
    this.modalControl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalControl.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
      
    }
  }

  onSubmit(){
    console.log("submit?")
    console.log(this.contactForm.value)
  }

  resetForm(){
    this.contactForm.reset();
  }

  onCountryChange(ev: ICountry){
    console.log(ev)
  } 


}
