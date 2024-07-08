import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Vet } from 'src/app/core/models/vet.model';

@Component({
  selector: 'app-vet-card',
  templateUrl: './vet-card.component.html',
  styleUrls: ['./vet-card.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    ContactCardComponent
  ]
})
export class VetCardComponent  implements OnInit {
  @Input() vet!: Vet;

  constructor() { }

  ngOnInit() {}

}
