import {Component, OnInit} from '@angular/core';

import { AuthService, User } from '../../services/auth.service';
import {Restaurant, RestaurantService} from "../../services/restaurant.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
  constructor(private restaurantService: RestaurantService) {}

  restaurant: Restaurant;

  ngOnInit(): void {
    this.retrieveRestaurant();
  }

  private retrieveRestaurant(): void {
    this.restaurantService.getRestaurant(AuthService.getUser().restaurant)
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });
  }
}
