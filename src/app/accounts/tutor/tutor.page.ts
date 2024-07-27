import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutes } from 'src/app/core/constants/constant.routes';
import { addIcons } from 'ionicons';
import { camera, cameraOutline, cloudCircleOutline, cloudUploadOutline } from 'ionicons/icons';
import { Tutor } from 'src/app/core/models/tutor.model';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { TutorService } from 'src/app/core/services/tutor/tutor.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.page.html',
  styleUrls: ['./tutor.page.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class TutorPage implements OnInit {
  appRoutes = AppRoutes
  tutor?: Tutor;
  file?: File;
  tutorImage?: any = "assets/avatar/avatar-male.png";
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  constructor(
    private dialogService: DialogService,
    private tutorService: TutorService
  ) { 
    addIcons({cameraOutline, camera, cloudUploadOutline});
  }

  ngOnInit() {
    this.retrieve()
  }

  uploadFile() {
    this.fileUpload.nativeElement.click();
  }

  onChange(event: any) {
    // const file: File = 
    this.file = event.target.files[0];

    if (this.file) {
      // this.file = file;
      // console.log(this.file.name)
    
      const reader = new FileReader();
      reader.onload = () => {
        this.tutorImage = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  retrieve(){
    const loader = this.dialogService.showLoading({message: "Loading..."});
    const id = "dfbb9192-489c-44ba-bd4a-e70a4e873ff9";
    this.tutorService.retrieve(id).subscribe({
      next: (response) => {
        console.log(response)
        this.tutor = response;
        this.dialogService.dismissLoading(loader);
      },
      error: (error) => {
        console.log(error);
        this.dialogService.dismissLoading(loader);
      }
    })
  }

  uploadTutorImage(){
    const loader = this.dialogService.showLoading({message: "Updating..."});
    const formData = new FormData()
    const id = "dfbb9192-489c-44ba-bd4a-e70a4e873ff9";
    formData.append("tutor-image", this.file!, this.file?.name);
    this.tutorService.updateImage(formData, id).subscribe({
      next: (response) => {
        console.log(response);
        this.tutor!.image = response.image;
        this.dialogService.dismissLoading(loader);
      },
      error: (error) => {
        console.log(loader);
        this.dialogService.dismissLoading(loader);
      }
    });
  }

}
