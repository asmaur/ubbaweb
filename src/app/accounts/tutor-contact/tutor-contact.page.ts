import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, MinLengthValidator, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutes } from 'src/app/core/constants/constant.routes';
import { addIcons } from 'ionicons';
import { add, closeOutline } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { ContactModalComponent } from 'src/app/shared/layouts/contact-modal/contact-modal.component';
import { IonItemSliding, IonItemOptions, IonItemOption } from "@ionic/angular/standalone";
import { Contact } from 'src/app/core/models/contact.model';
import { TutorService } from 'src/app/core/services/tutor/tutor.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { LoadingController } from '@ionic/angular';
import { HttpStatusCode } from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-tutor-contact',
  templateUrl: './tutor-contact.page.html',
  styleUrls: ['./tutor-contact.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonItemSliding,  
    SharedModule
  ]
})
export class TutorContactPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  appRoutes = AppRoutes;
  contacts: Contact[] = [];
  selectedContact?: Contact;
  
  
  constructor(
    private modalControl: ModalController,
    private readonly dialogService: DialogService,
    private loadingCtrl: LoadingController,
    private tutorService: TutorService,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService
  ) {
    addIcons({
      add,
      closeOutline
    })
  }

  ngOnInit() {
    this.loadTutorContacts();
  }

  async openContactModal(){
    const contactModal = await this.dialogService.showModal({
      component: ContactModalComponent,
      componentProps: {
        data: this.selectedContact
      },
      showBackdrop: true,
      backdropDismiss: false,
    
    })
    contactModal.onDidDismiss().then((result) => {
      console.log(result.data);
      this.createNewContact(result.data);
    })
  }

  async loadTutorContacts(){
    // const loader = this.dialogService.showLoading()
    const storageContact = await this.storageService.get("contacts");

    if(storageContact != null){
      this.contacts = storageContact;
      // this.dialogService.dismissLoading(loader);
    }else{
      const loader = this.dialogService.showLoading();

      this.tutorService.list().subscribe({
        next: (response) => {
          console.log(response);
          this.contacts = response;
          this.storageService.set("contacts", response);
          // this.dialogService.dismissLoading(loader);
        },
        error: (err) => {
          console.log(err.status);
          // this.dialogService.dismissLoading(loader);
        },
        complete: () => {
          this.dialogService.dismissLoading(loader);
        }
      })
    }

  }

  createNewContact(data: Contact){
    if(data == null){ return }
    const loader = this.dialogService.showLoading({message: "Saving..."});
    if(this.selectedContact != null){
      this.tutorService.update(this.selectedContact.id!, data).subscribe({
        next: (response) => {
          console.log(response);
          this.contacts = this.contacts.filter((contact) => contact.id !== response.id).concat(response);
          this.storageService.set("contacts", this.contacts);
          // this.dialogService.dismissLoading(loader);
          this.dialogService.showAlert({
            message: "Contact updated.", 
            header: "Success",
            buttons: ["Okay"]
          })
        },
        error: (error) => {
          if(error.status == HttpStatusCode.BadRequest){
            // this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Validation Error."})
          } else if(error.status == HttpStatusCode.NotFound){
            // this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Resource not found."})
          }
          else if(error.status == HttpStatusCode.InternalServerError){
            // this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Something when wrong."})
          }
        },
        complete: () => {
          this.dialogService.dismissLoading(loader);
        }
      })
    }else{
      
      this.tutorService.create(data).subscribe({
        next: (response) => {
          this.contacts = [...this.contacts, response];
          this.storageService.set("contacts", this.contacts);
          this.dialogService.dismissLoading(loader);
          this.dialogService.showAlert({message: "Contact saved successfully."})
        },
        error: (error) => {
          if(error.status == HttpStatusCode.BadRequest){
            this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Validation Error."})
          } else if(error.status == HttpStatusCode.NotFound){
            this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Resource not found."})
          }
          else if(error.status == HttpStatusCode.InternalServerError){
            this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Something when wrong."})
          }
        },
        complete: () => {}
      })
    }
  }

  async presentActionSheet(data?: Contact) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.selectedContact = data;
            this.deleteAlert()
          }
        },
        {
          text: 'Edit',
          data: {
            action: 'share',
          },
          handler: () => {
            this.selectedContact = data;
            this.openContactModal()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async deleteAlert(){
    // if(data == null){ return }
    // const loader = this.dialogService.showLoading({message: "Saving..."});
    const alert = await this.dialogService.showAlert({
      header: "Delete this contact?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: "Delete",
          handler: () => { this.deleteContact()}
        }
      ]
    })
    
  }

  deleteContact(){
    if(this.selectedContact != null){
      const loader = this.dialogService.showLoading({message: "Deleting..."});
      this.tutorService.destroy(this.selectedContact.id!).subscribe({
        next: (response) => {
          console.log(response);
          this.contacts = this.contacts.filter((contact) => contact.id !== this.selectedContact?.id)
          this.storageService.set("contacts", this.contacts);
          this.dialogService.dismissLoading(loader);
          this.dialogService.showAlert({
            message: "Contact deleted.", 
            header: "Success",
            buttons: ["Okay"]
          })
        },
        error: (error) => {
          if(error.status == HttpStatusCode.BadRequest){
            this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Validation Error."})
          } else if(error.status == HttpStatusCode.NotFound){
            this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Resource not found."})
          }
          else if(error.status == HttpStatusCode.InternalServerError){
            this.dialogService.dismissLoading(loader);
            this.dialogService.showErrorAlert({message: "Something when wrong."})
          }
          // else if(error.status == HttpStatusCode.NoContent){
          //   this.dialogService.dismissLoading(loader);
          //   this.dialogService.showErrorAlert({message: "Contact deleted successfully."})
          // }
        },
        complete: () => {}
      })

    }
  }

}
