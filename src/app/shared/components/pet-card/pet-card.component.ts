import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Pet } from 'src/app/core/models/pet.model';
import { AgePipe } from 'src/app/core/pipes/age.pipe';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
  ]
})
export class PetCardComponent  implements OnInit {
  @Input() pet!: Pet;
  //text = "Costelinhacfhfhghfgh"

  constructor() { }

  ngOnInit() {
    console.log("Okay")
  }

  ageCalculator(item: any) {
    console.log(item)
    if (item) {
      const birthDate = new Date(item);
      console.log(birthDate.getFullYear())
      const currentDate = new Date();
      
      let years = currentDate.getFullYear() - birthDate.getFullYear();
      let months = currentDate.getMonth() - birthDate.getMonth();
      let days = currentDate.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        let previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days = previousMonth.getDate() + days;
      }

      if (months < 0) {
        years--;
        months = 12 + months;
      }

      // this.item.ageYears = years;
      // this.item.ageMonths = months;
      // this.item.ageDays = days;
      return `${years} anos`
    }
    return ""
  }

}
