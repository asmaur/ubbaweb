import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ModalController } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-pet-modal',
  templateUrl: './edit-pet-modal.component.html',
  styleUrls: ['./edit-pet-modal.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class EditPetModalComponent  implements OnInit {
  data?: any;

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
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { 
    addIcons({close})
  }

  ngOnInit() {
    this.petForm.patchValue({
      tag: this.data.tag.uuid,
      name: this.data.name,
      nickname: this.data.nickname,
      pet_type: this.data.pet_type,
      race: this.data.race,
      birth_date: this.data.birth_date,
      castration: this.data.castration,
      genre: this.data.genre,
      observation: this.data.observation
    })
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss('confirm');
  }

  onSubmit(){
    if(this.petForm.valid){
      this.modalController.dismiss(this.petForm.value);
    }
  }

}
