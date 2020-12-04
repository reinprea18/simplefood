import { Component, OnInit } from '@angular/core';
import {Restaurant, RestaurantService} from "../services/restaurant.service";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[];
  displayedColumns: ['name'];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.retrieveRestaurants();
  }

  private retrieveRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
  }

}
