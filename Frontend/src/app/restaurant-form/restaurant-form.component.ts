import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Restaurant, RestaurantService} from '../services/restaurant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../services/country.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {

  restaurantFormGroup: FormGroup;

  constructor(private restaurantService: RestaurantService,
              private route: ActivatedRoute,
              private router: Router,
              public countryService: CountryService) { }

  ngOnInit(): void {

    this.restaurantFormGroup = new FormGroup({
      pk: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      street_address: new FormControl(''),
      postcode: new FormControl('', Validators.maxLength(4)),
      town: new FormControl(''),
      country: new FormControl(null)
    });
  }

  createOrUpdateRestaurant(): void {
    const pkFromFormGroup = this.restaurantFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.restaurantService.updateRestaurant(this.restaurantFormGroup.value)
        .subscribe(() => {
          alert('updated successfully!');
        });
    } else {
      this.restaurantService.createRestaurant(this.restaurantFormGroup.value)
        .subscribe((restaurant) => {
          alert('created successfully!');
          // this.router.navigate(['/restaurant-form/' + restaurant.pk]);
        });
    }
  }

}
