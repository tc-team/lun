import { Component, Inject, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { ProfileService } from './profile.service';
import { ValidationService } from '../utils/services/validation.service';
import { AlertService } from '../utils/services/alert.service';

import { StepsMap, StepsDescription, SocialList, PetsList } from './profile.config';

export interface Countries {
  [ index: string ]: string;
}

export interface Cities {
  [ index: string ]: {
    'country': number,
    'name': string
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  private profileFormTrigger: boolean;

  private currentStep = 1;
  private stepsMap: Object;
  private stepsDescriptionMap: Object;
  private stepsTitle: Array<Object>;
  private socialList: Array<Object>;
  private petsList: Array<Object>;

  countries: any;
  cities: any;
  iterableCitiesMap: any;
  isCountryCitiesPresented: boolean;

  profileForm: FormGroup;
  profileData: Object;
  copmleteForm = false;

  constructor(
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
        // crawler_link: [{value: '', disabled: false}, [ Validators.required ]],
        name: ['', [ Validators.required, Validators.minLength(3) ] ],
        email: ['', [ Validators.required, ValidationService.emailValidator ] ]
      }),
      // step 2
      location: _builder.group({
        country: ['', [ Validators.required ] ],
        city: ['', [ Validators.required ] ],
      }),
      // step 3
      // social: _builder.group({ this.buildSocial() }),
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
    // this.buildSocial();
    this.loadCountries();
  }

  public onSubmitProfileForm(event: Event): void { }

  public completeProfileForm(): void {
    this.copmleteForm = true;
    console.log(this.profileForm.value);
    this.profileData = this.profileForm.value;
  }

  private buildSocial() {
    // const arr = this.socialList.map((service) => {
    //    return this._builder.group({
    //      selected: [false, [ Validators.required ]],
    //      link: ['', []]
    //    }, { validator : ValidationService.dynamicRequiredValidator });
    //
    //   // return this._builder.control(false);
    //
    //   // return _builder.group({
    //   //     selected: [false, [Validators.required]],
    //   //     link: ['', []],
    //   //   });
    // });
    // console.log(this._builder.group(arr));
    // return this._builder.group(...arr);

    // return this._builder.group({
    //       street: ['', Validators.required],
    //       postcode: ['']
    //   });

    // const arr = this.socialList.map(service => {
    //   return this._builder.control(`${service['value']}`: []);
    //
    // });
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

  public canActivateStep(index?: number): Boolean {
    const controls = this.profileForm.controls[ this.stepToControllName(index ? index : this.currentStep) ];
    return (controls.valid) ? false : true ;
  }

  public activatePrevStepControll(): Boolean {
    return this.currentStep === 1 ? true : false;
  }
  public activateNextStepControll(): Boolean {
    return this.profileForm.controls[ this.stepToControllName(this.currentStep) ].invalid ? true : false;
  }

  // Bypass security and trust the given value to be safe style value
  public backgroundImg(url: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle (`url(${url})` );
  }

  // public getNextButtonText(): string {
  //   return this.currentStep === 4 ? 'Complete'  : 'Next  >';
  // }
  public getNextButtonConfig(): Object {
    return this.currentStep === 4
      ? {'text': 'Complete', 'class': 'finish'} : {'text': 'Next  >', 'class': 'completed'} ;
  }


  /*
   * Form handlers
   */

  public setCountry(event: any): void {
    // console.log(event);
    // clear City select
    this.profileForm.get('location').get('city').reset('');
    // Load selected country cities
    this.loadCities( Number(event.target.value) );
  }

  public setCity(event: Event): void {}

  public onSocialChange(event: any, formGroupName: string): void {
    const formControl = new FormControl('', [Validators.required, ValidationService.linkValidator]);
    // this.profileForm.controls['social'].controls[formGroupName];
    const formGroup = this.profileForm.get(`social.${formGroupName}`) as FormGroup;
    // console.log(formGroup);
    // console.log(formControl);
    if ((event.target.checked)) {
      formGroup.setControl('link', formControl);
    } else {
      formGroup.removeControl('link');
    }
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
    return this.stepsMap[`${stepNumber}`];
  }


}
