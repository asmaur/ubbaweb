import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { addIcons } from 'ionicons';
import { attachOutline, close } from 'ionicons/icons';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class UploadModalComponent  implements OnInit {
  data: any;
  file: File | null = null;
  imageSRC: any = null;
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  constructor(
    private dialogService: DialogService
  ) { 
    addIcons({close, attachOutline})
  }

  ngOnInit() {}

  cancel() {
    this.dialogService.dismissModal(null);
  }

  confirm() {
    // this.modalControl.dismiss('confirm');
  }

  uploadFile() {
    this.fileUpload.nativeElement.click();
  }

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      console.log(this.file.name)
    
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSRC = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  uploadPetImage(){
    const formData = new FormData();
    formData.append("pet-image", this.file!, this.file?.name);
  }


}
