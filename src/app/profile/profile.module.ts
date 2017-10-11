import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileResultComponent } from './profile-result/profile-result.component';

import { ProfileService } from './profile.service';

import { profileRoutes } from './profile.routes';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileFormComponent,
    ProfileResultComponent
  ],
  exports:      [ ProfileComponent, ProfileFormComponent,ProfileResultComponent ],
  providers:    [ ProfileService ]
})

export class ProfileModule { }
