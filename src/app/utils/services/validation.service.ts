import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

export class ValidationService {
  static PATTERN = {
    // RFC 2822 compliant rege
    EMAIL: /([\w+\.]+)@([\w\.]+)\.(\w+)/g,
  };

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Required',
      'invalid': validatorValue,
      'invalidEmailAddress': 'Invalid email address',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'wrongPet': 'You must select cat.'
    };

    return config[validatorName];
  }

  static isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
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
}
