import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetCardComponent } from '../../components/pet-card/pet-card.component';
import { SharedModule } from '../../shared.module';
import { Pet } from 'src/app/core/models/pet.model';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { repeatOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  standalone: true,
  imports: [
    PetCardComponent,
    SharedModule,
  ]
})
export class PetListComponent  implements OnInit {

  @Input() petList!: Pet[];
  @Input() hasNextPage!: boolean;
  @Output() loadMorePetEmitter = new EventEmitter<boolean>();

  constructor() { 
    addIcons({repeatOutline})
  }

  ngOnInit() {
    // throw new Error('Method not implemented.');
  }


  emitLoadMorePetEvent(){
    console.log("Okay")
    this.loadMorePetEmitter.emit(true);
    
  }

  onIonInfinite(event: any){
    if(this.hasNextPage){
      setTimeout(() => {
        // (event as InfiniteScrollCustomEvent).target.complete();
        this.emitLoadMorePetEvent();
      }, 500);

      // this.emitLoadMorePetEvent();
    }

    // if(event){
    //   event.target.complete();
    // }

    // setTimeout(() => {
    //   (event as InfiniteScrollCustomEvent).target.complete();
    // }, 500);

  }

  loadMoreCurrentUserPet(){
    if(this.hasNextPage){
      setTimeout(() => {
        // (event as InfiniteScrollCustomEvent).target.complete();
        this.emitLoadMorePetEvent();
      }, 500);

      // this.emitLoadMorePetEvent();
    }
  }

}
