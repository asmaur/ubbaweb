import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { IonSegmentButton, IonItemDivider } from "@ionic/angular/standalone";
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { EditPetModalComponent } from 'src/app/shared/layouts/edit-pet-modal/edit-pet-modal.component';
import { UploadModalComponent } from 'src/app/shared/components/upload-modal/upload-modal.component';
import { TransferModalComponent } from 'src/app/shared/components/transfer-modal/transfer-modal.component';
import { Tutor } from 'src/app/core/models/tutor.model';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.page.html',
  styleUrls: ['./pet-profile.page.scss'],
  standalone: true,
  imports: [IonItemDivider,   
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
  file: File | null = null;
  isLost: boolean = false;
  isAlive: boolean = true;
  seletedTab: string = "pet";
  currentTutor: Tutor | null = null;
  newTutor: Tutor | null = null;
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
    private dialogService: DialogService,
    private router: Router
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
        this.isAlive = res.alive;
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
    if(!this.isAlive || this.isLost){
      this.dialogService.showErrorAlert({message: "You can't edit lost or dead pet info."});
      return;
    }
    this.openEditPetModal();
  }

  openImageModal(event: any){
    if(!this.isAlive || this.isLost){
      this.dialogService.showErrorAlert({message: "You can't edit lost or dead pet info."});
      return;
    }
    this.openImagePetModal();
  }

  openLostAlert(event: any){
    if(!this.isAlive){
      this.dialogService.showErrorAlert({message: "You can't edit a dead pet info."});
      return;
    }
    if(this.pet?.lost){
      this.dialogService.showAlert({
        header: "Ubba ❤️.",
        // subHeader: "We sorry for your lost.",
        message: "Is your pet back home?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Yes",
            role: "confirm",
            handler: () => {
              this.updatePetLostStatus();
            }
          }
        ]
      })
    }else{
      this.dialogService.showAlert({
        header: "Ubba 🥹, we really sorry.",
        // subHeader: "We sorry for your lost.",
        message: "Want to declare your pet lost?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Declare",
            role: "confirm",
            handler: () => {
              this.updatePetLostStatus();
            }
          }
        ]
      })
    }
  }

  openDeceadedAlert(event: any){
    if(!this.isAlive){
      this.dialogService.showErrorAlert({message: "You can't edit a dead pet info."});
      return;
    }
    this.dialogService.showAlert({
      header: "Ubba 🥹, we really sorry.",
      // subHeader: "We sorry for your lost.",
      message: "Want to declare your pet dead?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Declare",
          role: "confirm",
          handler: () => {
            this.updatePetAliveStatus();
          }
        }
      ]
    })
  }

  async openTransferModal(event: any){
    if(!this.isAlive || this.isLost){
      this.dialogService.showErrorAlert({message: "You can't edit lost or dead pet info."});
      return;
    }
    const transferModal = await this.dialogService.showModal({
      component: TransferModalComponent,
      componentProps: {data: this.pet}
    });

    transferModal.onDidDismiss().then((result) => {
      console.log(result);
      this.petTransfer(result.data);
    })

  }

  async openImagePetModal(){
    const imageModal = await this.dialogService.showModal({
      component: UploadModalComponent,
      componentProps: {data: this.pet}
    })

    imageModal.onDidDismiss().then((result) => {
      if(result.data == null){
        this.dialogService.showErrorAlert({message: "Unable to load file."});
      }
      this.file = result.data;
      this.uploadFile();
    });

  }

  // async openLostPetModal(){}

  async openDeceadedPetModal(){}

  async openTransferPetModal(){}

  uploadFile() {
    const loader = this.dialogService.showLoading({message: "Uploading file..."})
    const formData = new FormData();
    formData.append("pet-image", this.file!, this.file?.name)
    this.petService.uploadPetImage(formData, this.pet.id!).subscribe({
      next: (response) => {
        console.log(response);
        this.pet.image = response.image;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.dialogService.dismissLoading(loader);
      }
    })
  }

  async updatePetLostStatus(){
    const loader = this.dialogService.showLoading({message: "Updating status..."})

    this.petService.updatePetLostStatus(
      {"lost": !this.pet.lost},
      this.pet.id!
    ).subscribe({
      next: (response) => {
        this.isLost = response.lost;
        this.pet.lost = response.lost;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.dialogService.dismissLoading(loader);
      }
    })

  }

  async updatePetAliveStatus(){
    const loader = this.dialogService.showLoading({message: "Updating status..."});

    this.petService.updatePetAliveStatus(
      {"alive": !this.pet.alive},
      this.pet.id!
    ).subscribe({
      next: (response) => {
        this.isAlive = response.alive;
        this.pet.alive = response.alive;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.dialogService.dismissLoading(loader);
      }
    })

  }

  petTransfer(data: any){
    const loader = this.dialogService.showLoading({message: "Tranfering..."})
    if(data === null){
      this.dialogService.dismissLoading(loader);
      return;
    }

    this.petService.transferPetToNewTutor(data).subscribe({
      next: (response) => {
        this.dialogService.dismissLoading(loader);
        this.dialogService.showAlert({
          message: "Transfer successfull",
          buttons: [
            {
              text: "Okay",
              handler: () => {
                this.router.navigate(['/']);
              }
            }
          ]
        })
      },
      error: (error) => {
        console.log(error);
        this.dialogService.dismissLoading(loader);
        this.dialogService.showErrorAlert({message: "Something went wrong!"})
      }
    })

  }

}
