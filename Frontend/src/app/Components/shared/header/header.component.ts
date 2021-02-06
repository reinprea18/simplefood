import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../../../services/auth.service';
import {Restaurant, RestaurantService} from '../../../services/restaurant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() inputSideNav: MatSidenav | undefined;
  isLoggedIn = false;
  username: string;
  restaurant: Restaurant;
  isTable: boolean;
  isAdmin: boolean;
  isRestaurantAdmin: boolean;
  isEmployee: boolean;

  constructor(public authService: AuthService, private restaurantService: RestaurantService) {  }

  ngOnInit(): void {
    this.authService.isLoggedIn
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (AuthService.getUser()) {
          this.retrieveRestaurant();
          this.username = AuthService.getUser().username;
          this.isAdmin = AuthService.isAdmin();
          this.isTable = AuthService.isTable();
          this.isRestaurantAdmin = AuthService.isRestaurantAdmin();
          this.isEmployee = AuthService.isEmployee();
        }
      });
  }

  logout(): void {
    this.authService.logOut();
  }

  private retrieveRestaurant(): void {
    this.restaurantService.getRestaurant(AuthService.getUser().restaurant)
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });
  }

}
