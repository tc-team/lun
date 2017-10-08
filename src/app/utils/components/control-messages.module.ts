import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-control-messages',
  template: `<div class="control-messages" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if ( this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}


@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ControlMessagesComponent ],
  exports:      [ ControlMessagesComponent ],
  providers:    [ ValidationService ]
})

export class ControlMessagesModule { }
