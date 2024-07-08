import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Contact } from 'src/app/core/models/contact.model';
import { Platform } from "@ionic/angular"
import { addIcons } from 'ionicons';
import { add, ellipsisVerticalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class ContactCardComponent  implements OnInit {
  @Input({required: true}) contact!: Contact;
  @Input() showName: boolean = false;
  
  constructor(
    private platform: Platform
  ) { 
    addIcons({add, ellipsisVerticalOutline})
  }

  ngOnInit() {}

  openMailTo(mail: string){
    this.platform.ready().then(() => {
      window.location.href = "mailto:mail@example.org";;
  });
  }

}
