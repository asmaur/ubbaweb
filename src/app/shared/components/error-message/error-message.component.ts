import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class ErrorMessageComponent {

  @Input() message?: string;
  @Input() field?: FormControl;
  @Input() error?: string;

  constructor() { }

  // ngOnInit() {}

  showErrorMessage(){
    console.log(this.error)
    if(this.field?.touched && (this.field.errors?.[this.error!] || this.field.invalid)){
      return true
    }
    return false;
  }

}
