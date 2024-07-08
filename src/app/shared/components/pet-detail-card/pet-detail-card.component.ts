import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Pet } from 'src/app/core/models/pet.model';

@Component({
  selector: 'app-pet-detail-card',
  templateUrl: './pet-detail-card.component.html',
  styleUrls: ['./pet-detail-card.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class PetDetailCardComponent  implements OnInit {
  @Input({required: true}) pet!: Pet;

  constructor() { }

  ngOnInit() {}

}
