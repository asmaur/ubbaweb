import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ExploreContainerComponent } from '../../shared/layouts/explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { addCircleOutline, addOutline, logoTwitter, personCircle, qrCode, qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import { PetListComponent } from 'src/app/shared/ui/pet-list/pet-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { Pet } from 'src/app/core/models/pet.model';
import { PetService } from 'src/app/core/services/pet/pet.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    PetListComponent,
    SharedModule
  ],
})
export class HomePage implements OnInit{
  hasNextPage: boolean = true;
  nextPageNumber: string = "1";
  petList: Pet[] = [
    {
      id: "hfgfgh",
      petname: {
        id: 1,
        pname: "shshshs",
      },
      tag: {
        id: "jshshsh",
        uuid: "sfhlsfjçsjflhshfls",
      },
      name: "pappi",
      race: "RSA",
      birth_date: "2015/10/10",
      castration: true,
      registered: true,
      alive: true,
      lost: true,
      genre: "female",
      observation: "alguma observação",
      image: "assets/images/lebron-james.jpg",
      joined_date: "2022/10/10",
      tutor: {
        id: "sdhdshjd",
        name: "askhjshfjhs shfsd", 
        image: "assets/images/lebron-james.jpg",
        contacts: []     
      }
    },
    {
      id: "hfgfgh",
      petname: {
        id: 1,
        pname: "shshshs",
      },
      tag: {
        id: "jshshsh",
        uuid: "sfhlsfjçsjflhshfls",
      },
      name: "pappi",
      race: "RSA",
      birth_date: "2015/10/10",
      castration: true,
      registered: true,
      alive: true,
      lost: false,
      genre: "Male",
      observation: "alguma observação",
      image: "assets/images/lebron-james.jpg",
      joined_date: "2022/10/10",
      tutor: {
        id: "sdhdshjd",
        name: "askhjshfjhs shfsd", 
        image: "assets/images/lebron-james.jpg",
        contacts: []     
      }
    },
    {
      id: "hfgfgh",
      petname: {
        id: 1,
        pname: "shshshs",
      },
      tag: {
        id: "jshshsh",
        uuid: "sfhlsfjçsjflhshfls",
      },
      name: "pappi",
      race: "RSA",
      birth_date: "2015/10/10",
      castration: true,
      registered: true,
      alive: true,
      lost: false,
      genre: "Male",
      observation: "alguma observação",
      image: "assets/images/lebron-james.jpg",
      joined_date: "2022/10/10",
      tutor: {
        id: "sdhdshjd",
        name: "askhjshfjhs shfsd", 
        image: "assets/images/lebron-james.jpg",
        contacts: []     
      }
    },
    {
      id: "hfgfgh",
      petname: {
        id: 1,
        pname: "shshshs",
      },
      tag: {
        id: "jshshsh",
        uuid: "sfhlsfjçsjflhshfls",
      },
      name: "pappi",
      race: "RSA",
      birth_date: "2015/10/10",
      castration: true,
      registered: true,
      alive: true,
      lost: false,
      genre: "Male",
      observation: "alguma observação",
      image: "assets/images/lebron-james.jpg",
      joined_date: "2022/10/10",
      tutor: {
        id: "sdhdshjd",
        name: "askhjshfjhs shfsd", 
        image: "assets/images/lebron-james.jpg",
        contacts: []     
      }
    },
  ];
  currentUserPetList: Pet[] = []

  constructor(
    private router: Router,
    private petService: PetService
  ) {
    addIcons({qrCode, addOutline, logoTwitter, personCircle, qrCodeOutline, qrCodeSharp})
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loadPetList();

  }

  getNextPageEvent(event: any){
    console.log(event);

    if(event){
      this.loadPetList();
    }

  }

  openQrcodeReaderPage(){
    this.router.navigate(["qrcode"]);
  }

  loadPetList(){    
      this.petService.getAllUserPet(this.nextPageNumber).subscribe({
        next: (res) => {
          console.log(res.results)
          //this.currentUserPetList = [...res["results"]]
          this.currentUserPetList = [...this.currentUserPetList, ...res.results]
          if(res.next){
            const url = new URL(res.next);
            this.nextPageNumber = url.searchParams.get("page") || "1";
            console.log(this.nextPageNumber)
            this.hasNextPage = true;
          }else{
            this.hasNextPage = false;
          }
        }
      })
    
  }

}
