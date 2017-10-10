import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ProfileComponent ],
  exports:      [ ProfileComponent ],
  providers:    [ ProfileService ]
})

export class ProfileModule { }
