import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// switch to the HashBang approach
// import { HashLocationStrategy, LocationStrategy, Location } from '@angular/common';

// Vendors

// Components
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile/profile-form/profile-form.component';
import { ProfileResultComponent } from './profile/profile-result/profile-result.component';

//
import { ProfileService } from './profile/profile.service';

// Modules
import { ControlMessagesModule } from './utils/components/control-messages.module';
import { AlertModule } from './utils/components/alert.module';

// Routing
import { RoutingModule } from './app.routes';

// Utils
import { ValidationService } from './utils/services/validation.service';
import { AlertService } from './utils/services/alert.service';
// import { ClearQuotes } from './utils/pipes/clearQuotes.pipe';

@NgModule({
  declarations: [
    AppComponent,

    // ClearQuotes,

    // Components
    IndexComponent,
    ProfileComponent,
    ProfileFormComponent,
    ProfileResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RoutingModule,

    ControlMessagesModule,
    AlertModule
  ],
  providers: [
    ValidationService,
    AlertService,
    ProfileService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
