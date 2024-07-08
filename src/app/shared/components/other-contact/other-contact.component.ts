import { Component, Input, OnInit } from '@angular/core';
import { IonCardContent } from "@ionic/angular/standalone";
import { SharedModule } from '../../shared.module';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Contact } from 'src/app/core/models/contact.model';

@Component({
  selector: 'app-other-contact',
  templateUrl: './other-contact.component.html',
  styleUrls: ['./other-contact.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    ContactCardComponent
  ]
})
export class OtherContactComponent  implements OnInit {
  @Input() contacts!: Contact[];
  
  constructor() { }

  ngOnInit() {}

}
