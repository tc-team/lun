import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileResultComponent } from './profile-result/profile-result.component';


// Route Configuration
export const profileRoutes: Routes = [{
  path: 'profile',
  component: ProfileComponent,
  children: [{
    path: '',
    redirectTo: 'form',
    pathMatch: 'full'
  }, {
    path: 'form',
    data: { title: 'Profile Form' },
    component: ProfileFormComponent,
  }, {
    path: 'preview',
    data: { title: 'Profile Preview' },
    component: ProfileResultComponent
  }]
}];
  // {
  //   path: 'profile',
  //   component: ProfileFormComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'general',
  //       pathMatch: 'full'
  //     }, {
  //       path: 'general',
  //       data: { title: 'Profile step 1' },
  //       component: ProfileGeneralComponent,
  //     }, {
  //       path: 'location',
  //       data: { title: 'Profile step 2' },
  //       component: ProfileLocationComponent,
  //     }, {
  //       path: 'social',
  //       data: { title: 'Profile step 3' },
  //       component: ProfileSocialComponent,
  //     }, {
  //       path: 'favorite',
  //       data: { title: 'Profile step 4' },
  //       component: ProfileFavouriteComponent,
  //     }
  //   ],
  // }, {
  //   path: 'view',
  //   component: ProfileResultComponent
  // }
