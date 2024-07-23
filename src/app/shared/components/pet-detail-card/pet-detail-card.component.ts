import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Pet } from 'src/app/core/models/pet.model';
import { addIcons } from 'ionicons';
import { add, chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, ellipsisVerticalCircle, ellipsisVerticalOutline, globe, document, createOutline, imageOutline, mapOutline, locateOutline, swapHorizontalOutline, flagOutline } from 'ionicons/icons';

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
  @Output() openModalEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() openImagePopoverEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() openLostPopoverEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() openDeceadedPopoverEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() openTransferModalEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {    
    addIcons({createOutline, ellipsisVerticalOutline, add, chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe, imageOutline, mapOutline, locateOutline, swapHorizontalOutline, flagOutline})
  }

  ngOnInit() {}

  openModalEvent(){
    this.openModalEventEmitter.emit();
  }

  openImagePopoverEvent(){
    this.openImagePopoverEventEmitter.emit();
  }

  openLostPopoverEvent(){
    this.openLostPopoverEventEmitter.emit();
  }

  openDeceadedPopoverEvent(){
    this.openDeceadedPopoverEventEmitter.emit();
  }

  openTransferModalEvent(){
    this.openTransferModalEventEmitter.emit();
  }

}
