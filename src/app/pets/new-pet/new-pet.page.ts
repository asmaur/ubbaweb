import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonModal, IonDatetime, IonDatetimeButton, IonAlert, IonText } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutes } from 'src/app/core/constants/constant.routes';
import { Contact } from 'src/app/core/models/contact.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/core/services/pet/pet.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.page.html',
  styleUrls: ['./new-pet.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    ErrorMessageComponent
  ]
})
export class NewPetPage implements OnInit {
  appRoutes = AppRoutes;
  contacts: Contact[] = [];
  petForm = this.formBuilder.group({
    tag: ["", [Validators.required],],
    name: ["", [Validators.required]],
    nickname: ["", [Validators.required]],
    pet_type: ["", [Validators.required]],
    race: ["", [Validators.required]],
    birth_date: [new Date().toISOString(), [Validators.required]],
    castration: [true],
    genre: ["", [Validators.required]],
    observation: [""]
  });


  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private petService: PetService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    const tagId = this.route.snapshot.queryParamMap.get("tag")
    console.log(tagId)
    this.petForm.patchValue({
      tag: tagId
    })
  }

  async loadContacts(){
    this.contacts = await this.storageService.get("contacts");
  }

  onSubmit(){
    console.log(this.petForm.value)
    const loader = this.dialogService.showLoading()
    if(this.petForm.valid){
      this.petService.create(this.petForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log("Completed..!")
          this.dialogService.dismissLoading(loader);
        }
      });
    }else{
      // this.dialogService.dismissLoading(loader);
    }
  }

}
