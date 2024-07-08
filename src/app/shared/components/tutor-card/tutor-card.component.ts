import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { addIcons } from 'ionicons';
import { logoGithub, logoInstagram, logoTwitter, logoWechat, logoWhatsapp, mailOutline } from 'ionicons/icons';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { Tutor } from 'src/app/core/models/tutor.model';
import { Contact } from 'src/app/core/models/contact.model';

@Component({
  selector: 'app-tutor-card',
  templateUrl: './tutor-card.component.html',
  styleUrls: ['./tutor-card.component.scss'],
  standalone: true,
  imports: [SharedModule, ContactCardComponent]
})
export class TutorCardComponent  implements OnInit {
  @Input({required: true}) tutor!: Tutor;
  @Input() contacts!: Contact[];

  constructor() { 
    addIcons({logoTwitter, logoInstagram, logoWhatsapp, logoWechat, mailOutline})
  }

  ngOnInit() {}

}
