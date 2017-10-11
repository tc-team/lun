import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule, DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { ProfileService } from './../profile.service';
import { ProfileData } from '../../utils/models/ProfileData';

@Component({
  selector: 'app-profile-result',
  templateUrl: './profile-result.component.html',
  styleUrls: ['./profile-result.component.scss']
})
export class ProfileResultComponent {

  info: ProfileData = <ProfileData>{};

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _profileService: ProfileService
  ) {
    this.info = this._profileService.profileData;
    // console.log(this.info);
  }

  public again(): void {
    this._profileService.clearProfileData();
    this._router.navigateByUrl('/profile/form');
  }

  // Bypass security and trust the given value to be safe style value
  public backgroundImg(url: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle (`url(${url})` );
  }

}
