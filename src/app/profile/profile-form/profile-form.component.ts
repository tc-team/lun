import { Component, Inject, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from './../profile.service';
import { ValidationService } from '../../utils/services/validation.service';
import { AlertService } from '../../utils/services/alert.service';

import { StepsMap, StepsDescription, SocialList, PetsList } from './../profile.config';

import { ProfileData } from '../../utils/models/ProfileData';

export interface Countries {
  [ index: string ]: string;
}

export interface City {
  'country': number;
  'name': string;
}

export interface Cities {
  [ index: string ]: City;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

    private formState = {
      general: {
        name: '',
        email: ''
      },
      location: {
        country: '',
        city: ''
      },
      social: {
        fb: false,
        vk: false,
        tw: false,
        ok: false
      },
      favorite: {
        pet: ''
      }
    };

    private profileFormTrigger: boolean;

    public currentStep = 1;
    private stepsMap: Object;
    private stepsDescriptionMap: Object;
    private stepsTitle: Array<Object>;
    private socialList: Array<Object>;
    private petsList: Array<Object>;

    countries: Countries;
    cities: Cities;
    iterableCitiesMap: Array<string>;
    isCountryCitiesPresented: boolean;

    profileForm: FormGroup;
    profileData: ProfileData = <ProfileData>{};
    copmleteForm = false;

    constructor(
      private _router: Router,
      private _builder: FormBuilder,
      private _sanitizer: DomSanitizer,
      private _alertService: AlertService,
      private _profileService: ProfileService
    ) {

      this.stepsMap = StepsMap;
      this.stepsDescriptionMap = StepsDescription;
      this.socialList = SocialList;
      this.petsList = PetsList;

      this.profileFormTrigger = false;
      this.isCountryCitiesPresented = true;


      // Form __builder and validation configuration
      this.profileForm = _builder.group({
        // step 1
        general: _builder.group({
          name: ['', [ Validators.required, Validators.minLength(3) ] ],
          email: ['', [ Validators.required, ValidationService.emailValidator ] ]
        }),
        // step 2
        location: _builder.group({
          country: ['', [ Validators.required ] ],
          city: ['', [ Validators.required ] ],
        }),
        // step 3
        social: _builder.group({
          fb: _builder.group({
            selected: [false, [ Validators.required ]],
          }),
          vk: _builder.group({
            selected: [false, [ Validators.required ]],
          }),
          tw: _builder.group({
            selected: [false, [ Validators.required ]],
          }),
          ok: _builder.group({
            selected: [false, [ Validators.required ]],
          })
          //  { validator : ValidationService.dynamicRequiredValidator } )
        }),
        // step 4
        favorite: _builder.group({
          pet: ['' , [ Validators.required, ValidationService.petValidator('cat') ]],
        })
      });
    }

    ngOnInit() {
      this.loadCountries();
    }

    public onSubmitProfileForm(event: Event): void { }

    public completeProfileForm(): void {
      this.copmleteForm = true;

      // let {
      //   general: { name: name },
      //   general: { email: email },
      //   location: address,
      //   social: social,
      //   favorite: { pet: pet }
      // } = this.profileForm.value;
      //
      // this._profileService.profileData = {
      //   'name': name,
      //   'email': email,
      //   'address': this.getCountryNameById(address.country) + ', ' + this.getCityById(address.city).name,
      //   'social': this.getSocialForDisplay(social),
      //   'pet': pet
      // } as ProfileData;

      this.profileData = {
        'name': this.profileForm.value.general.name,
        'email': this.profileForm.value.general.email,
        'address': this.getCountryNameById(this.profileForm.value.location.country) + ', ' + this.getCityById(this.profileForm.value.location.city).name,
        'social': this.getSocialForDisplay(this.profileForm.value.social),
        'pet': this.profileForm.value.favorite.pet
      };

      this._profileService.profileData = this.profileData;
      this.clearFormData();
      this._router.navigateByUrl('/profile/preview');
    }


    /*
     * Step handlers
     */

    // Returns string with step description
    public getStepsDescription(): string {
      return `${this.stepsDescriptionMap[ this.currentStep ].number}. ${this.stepsDescriptionMap[ this.currentStep ].descr}`;
    }

    public setStep(stepIndex: number): void {
      this.currentStep = stepIndex;
    }

    // Returns class name for steps controlls buttons
    // Not handling pristine steps because of [disabled] attribute presented
    public isCurrentStep(index: number): string {
      return index < this.currentStep ? 'completed' : 'current';
    }

    public decrementStep(): void {
      this.setStep(--this.currentStep);
    }
    public incrementStep(): void {
      this.currentStep === 4
        ? this.completeProfileForm() : this.setStep(++this.currentStep);
    }

    public canActivateStep(index: number): Boolean {
      const controls = this.profileForm.controls[ this.stepToControllName(index) ];
      return (controls.valid && this.currentStep > index) ? false : true ;
    }

    public activatePrevStepControll(): Boolean {
      return this.currentStep === 1 ? true : false;
    }
    public activateNextStepControll(): Boolean {
      return this.profileForm.controls[ this.stepToControllName(this.currentStep) ].valid ? false : true;
    }

    // Bypass security and trust the given value to be safe style value
    public backgroundImg(url: string): SafeStyle {
      return this._sanitizer.bypassSecurityTrustStyle (`url(${url})` );
    }

    public getNextButtonConfig(): Object {
      return this.currentStep === 4
        ? {'text': 'Complete', 'class': 'finish'} : {'text': 'Next  >', 'class': 'completed'} ;
    }

    // Clear form. Set currentn step to start
    public clearFormData(): void {
      // Remove added 'link' FormControlls
      this.socialList.forEach((curValue, index, array) => {
        const formGroup = this.profileForm.get(`social.${curValue['value']}`) as FormGroup;
        formGroup.removeControl('link');
      });
      this.profileForm.reset(this.formState);
    }


    /*
     * Form handlers
     */

    public setCountry(event: any): void {
      // clear City select
      this.profileForm.get('location').get('city').reset('');
      // Load selected country cities
      this.loadCities( Number(event.target.value) );
    }

    public setCity(event: Event): void {}

    public onSocialChange(event: any, formGroupName: string): void {
      const formControl = new FormControl('', [Validators.required, ValidationService.linkValidator]);
      const formGroup = this.profileForm.get(`social.${formGroupName}`) as FormGroup;

      (event.target.checked) ? formGroup.setControl('link', formControl) : formGroup.removeControl('link');
    }

    /*
     * Data load
     */

    private loadCountries(): void {
      this._profileService.getCountries().subscribe(
        (result) => {
          this.countries = result;
        },
        (error) => this._alertService.success('error'),
      );
    }

    private loadCities(cityId?: number ): any {
      this._profileService.getCities(cityId).subscribe(
        (result) => {
          this.cities = result;
          // call mapToIterable() once for check empty cities object and *ngFor directive
          this.iterableCitiesMap = this.mapToIterable(this.cities);
          this.isCountryCitiesPresented = Boolean(this.iterableCitiesMap.length);
        },
        (error) => this._alertService.error(error),
      );
    }


    /*
     * Helpers
     */

    // Return array of provided object keys
    private mapToIterable(object: Object): Array<any> {
      return object ? Object.keys(object) : new Array();
    }

    // Return form controll name basen on current step number
    private stepToControllName(stepNumber: number): any {
      return this.stepsDescriptionMap[`${stepNumber}`].name;
    }

    // Return array of provided social links
    private getSocialForDisplay(objLinks: Object): Array<object> {
      const arr = new Array();

      for (let key in objLinks) {
        if (objLinks[key].selected) {
          arr.push({ 'name': key, 'link': objLinks[key].link });
        }
      }

      return arr;
    }

    private getCountryNameById(id: number|string): string {
      return this.countries[id];
    }

    private getCityById(id: number|string): any {
      return this.cities[id];
    }

  }
