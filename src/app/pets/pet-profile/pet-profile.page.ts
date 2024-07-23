import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { addIcons } from 'ionicons';
import { add, chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, createOutline, ellipsisVerticalOutline, globe, document } from 'ionicons/icons';
import { TutorCardComponent } from 'src/app/shared/components/tutor-card/tutor-card.component';
import { PetDetailCardComponent } from 'src/app/shared/components/pet-detail-card/pet-detail-card.component';
import { VetCardComponent } from 'src/app/shared/components/vet-card/vet-card.component';
import { AppRoutes } from 'src/app/core/constants/constant.routes';
import { Pet } from 'src/app/core/models/pet.model';
import { OtherContactComponent } from 'src/app/shared/components/other-contact/other-contact.component';
import { Contact } from 'src/app/core/models/contact.model';
import { Vet } from 'src/app/core/models/vet.model';
import { PetService } from 'src/app/core/services/pet/pet.service';
import { IonSegmentButton } from "@ionic/angular/standalone";
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { EditPetModalComponent } from 'src/app/shared/layouts/edit-pet-modal/edit-pet-modal.component';
import { UploadModalComponent } from 'src/app/shared/components/upload-modal/upload-modal.component';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.page.html',
  styleUrls: ['./pet-profile.page.scss'],
  standalone: true,
  imports: [  
    SharedModule,
    TutorCardComponent,
    PetDetailCardComponent,
    VetCardComponent,
    OtherContactComponent,
    EditPetModalComponent,
    UploadModalComponent
  ]
})
export class PetProfilePage{
  appRoutes = AppRoutes;
  pet!: Pet;
  isLost: boolean = false;
  seletedTab: string = "pet";
  // {
  //   id: "hfgfgh",
  //   petname: {
  //     id: 1,
  //     pname: "shshshs",
  //   },
  //   tag: {
  //     id: "jshshsh",
  //     uuid: "sfhlsfjçsjflhshfls",
  //   },
  //   name: "pappi",
  //   race: "RSA",
  //   birth_date: "2015/10/10",
  //   castration: true,
  //   registered: true,
  //   alive: true,
  //   lost: true,
  //   genre: "female",
  //   observation: "alguma observação",
  //   image: "assets/images/lebron-james.jpg",
  //   joined_date: "2022/10/10",
  //   tutor: {
  //     id: "sdhdshjd",
  //     name: "Valesca Compiled", 
  //     image: "assets/images/lebron-james.jpg",
  //     contacts: [
  //       {
  //         id: 1,
  //         name: "Valesca Compiled",
  //         email: "valesca@gmail.com",
  //         phone: "51991649141",
  //         social: true,
  //         emergency: true,
  //         instagram: "https://instagram.com/valesca",
  //         twitter: "https://instagram.com/valesca",
  //         facebook: "https://instagram.com/valesca",
  //         tiktok: "https://instagram.com/valesca",
  //         mine: true
  //       },
  //       {
  //         id: 1,
  //         name: "Valesca Prima",
  //         email: "prima@gmail.com",
  //         phone: "51991649141",
  //         social: true,
  //         emergency: true,
  //         instagram: "https://instagram.com/valesca",
  //         twitter: "https://instagram.com/valesca",
  //         facebook: "https://instagram.com/valesca",
  //         tiktok: "https://instagram.com/valesca",
  //         mine: false
  //       },
  //       {
  //         id: 1,
  //         name: "Valesca Prima 2",
  //         email: "prima@gmail.com",
  //         phone: "51991649141",
  //         social: true,
  //         emergency: true,
  //         instagram: "https://instagram.com/valesca",
  //         twitter: "https://instagram.com/valesca",
  //         facebook: "https://instagram.com/valesca",
  //         tiktok: "https://instagram.com/valesca",
  //         mine: false
  //       }
  //     ]     
  //   },
  //   vet: {
  //       id: 1,
  //       doctorName: " doctor name",
  //       hospitalName: "santa pet",
  //       doctorCRM: "haha233",
  //       contacts: [
  //         {
  //           id: 1,
  //           name: "Valesca Doc",
  //           email: "valescadoc@gmail.com",
  //           phone: "51991649141",
  //           social: true,
  //           emergency: true,
  //           instagram: "https://instagram.com/valesca",
  //           twitter: "https://instagram.com/valesca",
  //           facebook: "https://instagram.com/valesca",
  //           tiktok: "https://instagram.com/valesca",
  //           mine: false
  //         },
  //         {
  //           id: 1,
  //           name: "Valesca Doc",
  //           email: "valescadoc@gmail.com",
  //           phone: "51991649141",
  //           social: true,
  //           emergency: true,
  //           // instagram: "https://instagram.com/valesca",
  //           // twitter: "https://instagram.com/valesca",
  //           // facebook: "https://instagram.com/valesca",
  //           // tiktok: "https://instagram.com/valesca",
  //           mine: false
  //         },
  //       ]
  //     }
  // };

  tutorContacts: Contact[] = [];
  otherContacts: Contact[] = [];

  @ViewChild('fileButton', { static: false }) fileButton!: ElementRef;
  fileName: string = '';


  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    private dialogService: DialogService
    //public confData: ConferenceData,
    //public inAppBrowser: InAppBrowser,
  ) {
    addIcons({createOutline, ellipsisVerticalOutline, add, chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe})
  }

  // ngOnInit(): void {
  //     this.getOtherContacts();
  //     this.getTutorContacts();
  //     console.log(this.route.snapshot.params["id"])
  // }

  ionViewWillEnter(){
    const tagId = this.route.snapshot.paramMap.get("id")
    console.log(tagId)
    this.petService.retrieve(tagId!).subscribe({
      next: (res) => {
        console.log(res);
        this.pet = res;
        this.isLost = res.lost;
        //this.getOtherContacts();
        //this.getTutorContacts();
        this.tutorContacts = res.tutor!.contacts;
      }
    })
    

  }

  onIonChange(event: any){
    console.log(event.detail.value);
    this.seletedTab = event.detail.value;
  }

  getOtherContacts(){
    this.otherContacts = this.pet.tutor!.contacts.filter(item => item.mine == false)
    console.log(this.otherContacts)
  }

  getTutorContacts(){
    this.tutorContacts = this.pet.tutor!.contacts.filter(item => item.mine == true)
    console.log(this.tutorContacts);
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: 'mail',
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: 'call',
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openEditPetModal(){
    const contactModal = await this.dialogService.showModal({
      component: EditPetModalComponent,
      componentProps: {
        data: this.pet
      },
      showBackdrop: true,
      backdropDismiss: false,
    
    })
    contactModal.onDidDismiss().then((result) => {
      console.log(result.data);
      if(result.data == null){
        return;
      }
      this.updatePet(result.data);
    })
  }

  updatePet(data: any){
    const loader = this.dialogService.showLoading();
    this.petService.update(data, this.pet.id!).subscribe({
      next: (response) => {
        console.log(response);
        this.pet = response;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.dialogService.dismissLoading(loader);
      }
    });
  }

  openEditModal(event: any){
    this.openEditPetModal();
  }

  openImagePopover(event: any){
    this.openImagePetModal();
  }

  openLostPopover(event: any){}

  openDeceadedPopover(event: any){}

  openTransferModal(event: any){}

  async openImagePetModal(){
    this.dialogService.showModal({
      component: UploadModalComponent,
      componentProps: {data: this.pet}
    })
  }

  async openLostPetModal(){}

  async openDeceadedPetModal(){}

  async openTransferPetModal(){}

  uploadFile() {
    this.fileButton.nativeElement.click();
  }

  fileChanged(event: any) {
    // this.fileButton.nativeElement.click();

    const files = event.target.files;
    console.log(files);
    const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageURL = reader.result;
    // };
    reader.readAsDataURL(event.target.files[0]);
    this.fileName = event.target.files[0].name;
  }

}
