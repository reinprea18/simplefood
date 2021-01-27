import { Component, OnInit } from '@angular/core';
import {Restaurant, RestaurantService} from '../services/restaurant.service';
import {AuthService} from "../services/auth.service";
import {MenuItem} from "../services/menu.service";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[];
  displayedColumns = ['name', 'menu', 'edit', 'delete'];
  menuItems: MenuItem[];

  constructor(private restaurantService: RestaurantService,
              private authService: AuthService,) { }

  ngOnInit(): void {
    this.retrieveRestaurants();
  }

  private retrieveRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
  }

  deleteRestaurant(restaurant: Restaurant): void {
    this.restaurantService.deleteRestaurant(restaurant)
      .subscribe(() => {
        this.retrieveRestaurants();
        alert('deleted successfully!');
      });
  }

}
