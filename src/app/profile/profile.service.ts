import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, QueryEncoder, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ProfileData } from './../utils/models/ProfileData';


@Injectable()
export class ProfileService {

  private _profileData: ProfileData = <ProfileData>{};

  constructor(
    private _http: Http
  ) {

  }

  /**
   * Return profile data
   * @function {profileData}
   * @return {ProfileData} - profile data
   */
  get profileData(): ProfileData {
    return this._profileData;
  }

  set profileData(info: ProfileData) {
    this._profileData = info;
    // return;
  }

  public clearProfileData(): void {
    this._profileData = <ProfileData>{};
  }

  /**
   * Returns list of countries
   * @return {Observable} Returns Observable object
   */
  public getCountries(): Observable<any> {
    return this._http
      .get('assets/data/countries.json')
      .map((response: Response) => response.json())
      .catch((error: any) => error);
  }


  /**
   * Returns list of cities
   * @param {Number} countryId - optional parameter: specific country id
   * @return {Observable} Returns Observable object
   */
  public getCities(countryId?: number): Observable<any> {
    return this._http
      .get(`assets/data/cities.json`)
      .map((response: Response) => response.json())
      .map((response) => {
        if ( !countryId ) { return response; }

        const filteredObj = new Object();
        for (let prop in response) {
          if ( response.hasOwnProperty(prop) && response[prop].country === countryId ) {
            filteredObj[prop] = response[prop];
          }
        }
        return filteredObj;
      })
      .catch((error: any) => error);
  }


}
