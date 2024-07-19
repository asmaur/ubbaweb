import { Component, OnInit, inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core/components';
import { SharedModule } from '../../shared.module';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { LoadingController } from '@ionic/angular';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    // NgxIntlTelephoneInputModule,
    // InternationalPhoneModule,
    // NgxIntlTelInputModule,
    NgxMaterialIntlTelInputComponent,
    ErrorMessageComponent
    
  ]
})
export class ContactModalComponent implements OnInit{
  protected formBuilder = inject(FormBuilder);
  data?: any;
  
  contactForm =  this.formBuilder.group({
    name: [
            "",
            [Validators.required, Validators.min(4), Validators.maxLength(25)]
          ],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required,]],
    mine: [false],
    social: [true],
    instagram: [
                  "",
                  [
                    Validators.required,
                    // Validators.pattern("^(@)(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$"),
                    Validators.maxLength(30)
                  ]
                ],
    tiktok: [
              "",
              [
                Validators.required,
                // Validators.pattern("/^(@)(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/"),
                Validators.maxLength(24)
              ]
            ]
  })

  

  constructor(
    private modalControl: ModalController,
    private readonly dialogService: DialogService,
    private loadingCtrl: LoadingController,
  ) {
    addIcons({close})
    
  }

  ngOnInit() {
    if(this.data != null){
      this.contactForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone,
        mine: this.data.mine,
        social: this.data.social,
        tiktok: this.data.tiktok,
        instagram: this.data.instagram        
      })
    }
  }

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



  resetForm(){
    this.contactForm.reset();
  }

  // onInputChange(ev: InputValue){
  //   this.phoneData = ev
  // } 

  async showLoading() {
    return this.dialogService.showLoading();
  }

  async dismissLoading(loadingElement: any){
    this.dialogService.dismissLoading(loadingElement);
  }

  onSubmit(){
    console.log("submit?")
    // const loader = this.showLoading()
    // if(this.phoneData != null && this.phoneData.isNumberValid){
    //   console.log("Valid phone")
    //   this.contactForm.patchValue({
    //     "phone": this.phoneData!.phoneNumber
    //   })
    //   this.dismissLoading(loader)
    // }
    if(this.contactForm.valid){
      // this.dismissLoading(loader)
      console.log(this.contactForm.value);
    }
    // this.dismissLoading(loader)

    // this.dialogService.showErrorAlert()
    console.log(this.contactForm.value);
    this.dialogService.dismissModal(this.contactForm.value)
  }


}
