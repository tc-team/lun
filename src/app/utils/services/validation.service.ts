import { FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

export class ValidationService {
  static PATTERN = {
    // RFC 2822 compliant rege
    EMAIL: /([\w+\.]+)@([\w\.]+)\.(\w+)/g,
    LINK: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
  };

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Required',
      'invalid': validatorValue,
      'invalidEmailAddress': 'Invalid email address',
      'invalidLink': 'Invalid link address',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'wrongPet': 'You chose a dog. And you need a cat.',
      'provideLink': 'Provade your social link'
    };

    return config[validatorName];
  }

  static isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }

  static linkValidator(control) {
    if ( control.value.match(ValidationService.PATTERN.LINK) ) {
      return null;
    } else {
      return { 'invalidLink': true };
    }
  }

  static emailValidator(control) {
    if ( control.value.match(ValidationService.PATTERN.EMAIL) ) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static petValidator(pattern) {
    // return (group: AbstractControl): { [key: string]: any } => {
    //   const input = group.get(controlKey);
    //   if (input.value.includes(pattern)) {
    //     return null;
    //   } else {
    //     return { 'wrongPet': true };
    //   }
    // };
    return (group: AbstractControl): { [key: string]: any } => {
      if ( this.isPresent(Validators.required(group)) ) { return null; }
      // let v: number = +group.value;
      // return (v === includeVal || v >= value) ? null : { 'include': { maxValue: value } };
      return (group.value.includes(pattern)) ? null : { 'wrongPet': true };
    };
  }


  static dynamicRequiredValidator(g: FormGroup) {
    const selected = g.get('selected').value;
    const link = g.get('link').value;
    // console.log(control.match(ValidationService.PATTERN.LINK));

    // value ? control.setValidators(Validators.required) : control.clearValidators();
    //  && link.match(ValidationService.PATTERN.LINK)
    return (selected) ? { 'provideLink': true } : null;
    // console.log(v);
    // return v;
  }
}
