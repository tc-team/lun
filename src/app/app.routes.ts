// Imports
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { indexRoutes }           from './index/index.routes';
import { profileRoutes }         from './profile/profile.routes';


// Route Configuration
const routes: Routes = [
  // {
  //   path: '**', component: IndexComponent,
  // },
  // Add routes form a different files
  ...profileRoutes

];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];


// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

// exporting routes
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class routingModule {}
