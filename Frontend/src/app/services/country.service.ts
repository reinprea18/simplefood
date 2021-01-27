import { Injectable } from '@angular/core';

export interface Country {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  predefinedCountries: Country[] = [
    {
      name: 'Austria'
    },
    {
      name: 'Germany'
    },
    {
      name: 'Greece'
    },
    {
      name: 'France'
    },
    {
      name: 'Belgium'
    },
  ];

  constructor() { }
}
