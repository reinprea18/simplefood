import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Restaurant, RestaurantService} from '../services/restaurant.service';

class UserData{
  constructor(
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public group?: string,
    public restaurant?: string,
  ) {
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: UserData = new UserData();
  restaurants: Restaurant[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private restaurantService: RestaurantService,
  ) {}

  onChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
    }
  }

  onSubmit(): void {
    this.authService.signUp(
      this.user.username,
      this.user.firstName,
      this.user.lastName,
      this.user.password,
      this.user.group,
      this.user.restaurant ,
    ).subscribe(() => {
      this.router.navigateByUrl('/log-in');
    }, (error) => {
      console.error(error);
    });
  }

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
