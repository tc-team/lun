// Deprecated import
// import { RouterConfig } from '@angular/router';
import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

// Route Configuration
export const profileRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { title: 'Profile Component' },
    component: ProfileComponent
  }
];
