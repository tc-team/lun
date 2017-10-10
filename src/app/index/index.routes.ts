// Deprecated import
// import { RouterConfig } from '@angular/router';
import { Routes } from '@angular/router';

import { IndexComponent } from './index.component';

// Route Configuration
export const indexRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile'
  }
];
// component: IndexComponent,
