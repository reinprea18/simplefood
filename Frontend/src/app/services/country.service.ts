import { Injectable } from '@angular/core';
import {Country} from '@angular-material-extensions/select-country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  predefinedCountries: Country[] = [
    {
      name: 'Germany',
      alpha2Code: 'DE',
      alpha3Code: 'DEU',
      numericCode: '276'
    },
    {
      name: 'Greece',
      alpha2Code: 'GR',
      alpha3Code: 'GRC',
      numericCode: '300'
    },
    {
      name: 'France',
      alpha2Code: 'FR',
      alpha3Code: 'FRA',
      numericCode: '250'
    },
    {
      name: 'Belgium',
      alpha2Code: 'BE',
      alpha3Code: 'BEL',
      numericCode: '056'
    },
  ];

  constructor() { }

  onCountrySelected($event: Country): void {
    console.log($event.alpha2Code);
  }
}
