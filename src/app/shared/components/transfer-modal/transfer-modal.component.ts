import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { addIcons } from 'ionicons';
import { close, heartDislikeOutline, heartOutline, search, swapHorizontalOutline, swapVerticalOutline } from 'ionicons/icons';
import { FormBuilder, Validators } from '@angular/forms';
import { PetService } from 'src/app/core/services/pet/pet.service';
import { Tutor } from 'src/app/core/models/tutor.model';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class TransferModalComponent  implements OnInit {
  data: any;
  currentTutor: Tutor | null = null;
  newTutor: Tutor | null = null;
  show: boolean = false;
  showErrorLabel: boolean = false;
  noTutor: boolean = false;

  searchForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  });

  constructor(
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private petService: PetService
  ) { 
    addIcons({close, search, swapHorizontalOutline, swapVerticalOutline, heartOutline, heartDislikeOutline});
  }

  ngOnInit() {}

  cancel() {
    this.dialogService.dismissModal(null);
  }

  searchTutor(){
    
    if(this.searchForm.valid){
      this.show = true;
      this.noTutor = false;
      console.log("Okay")
      this.petService.findNewTutorData(this.searchForm.value).subscribe({
        next: (response) => {
          this.newTutor = response;
          this.show = false;
        },
        error: (error) => {
          console.log(error);
          this.show = false;
          this.noTutor = true;
        }
      });
    }
  }

  transfer(){
    this.dialogService.dismissModal({
      "tag": this.data.tag.uuid,
      "new_tutor_id": this.newTutor?.id,
      "current_tutor_id": this.data.tutor.id
    })
  }

}
