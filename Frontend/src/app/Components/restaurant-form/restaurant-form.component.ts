import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../../services/restaurant.service';
import {CountryService, Country} from '../../services/country.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {

  restaurantFormGroup: FormGroup;
  countryOptions: Country[];

  constructor(private restaurantService: RestaurantService,
              private route: ActivatedRoute,
              private router: Router,
              public countryService: CountryService) { }

  ngOnInit(): void {

    this.countryOptions = this.countryService.predefinedCountries;

    this.restaurantFormGroup = new FormGroup({
      pk: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      street_address: new FormControl(''),
      postcode: new FormControl('', Validators.maxLength(4)),
      town: new FormControl(''),
      country: new FormControl(this.countryOptions[0].name)
    });

    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.restaurantService.getRestaurant(parseInt(pkFromUrl, 10))
        .subscribe((restaurant) => {
          this.restaurantFormGroup.patchValue(restaurant);
        });
    }
  }

  createOrUpdateRestaurant(): void {
    const pkFromFormGroup = this.restaurantFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.restaurantService.updateRestaurant(this.restaurantFormGroup.value)
        .subscribe(() => {
          alert('updated successfully!');
          this.router.navigate(['/restaurant-list/']);
        });
    } else {
      this.restaurantService.createRestaurant(this.restaurantFormGroup.value)
        .subscribe((restaurant) => {
          alert('created successfully!');
          this.router.navigate(['/restaurant-list/']);
        });
    }
  }
}
