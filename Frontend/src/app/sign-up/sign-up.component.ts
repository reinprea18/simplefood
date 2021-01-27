import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Restaurant, RestaurantService} from '../services/restaurant.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  disableSelect = new FormControl(false);
  permissionGroups: string[];
  userFormGroup: FormGroup;

  constructor(
    private router: Router,
    public authService: AuthService,
    private restaurantService: RestaurantService,
  ) {}

  onChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
    }
  }

  onSubmit(): void {
    this.authService.signUp(
      this.userFormGroup.value.username,
      this.userFormGroup.value.first_name,
      this.userFormGroup.value.last_name,
      this.userFormGroup.value.password,
      this.userFormGroup.value.permissionGroup,
      this.userFormGroup.value.restaurant,
    ).subscribe(() => {
      this.router.navigateByUrl('/landing');
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.retrieveRestaurants();
    this.permissionGroups = this.authService.permissionGroups;

    this.userFormGroup = new FormGroup({
      pk: new FormControl(null),
      restaurant: new FormControl(null),
      permissionGroup: new FormControl(null, Validators.required),
      username: new FormControl('', Validators.required),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      password: new FormControl('')
    });
  }

  private retrieveRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
  }
}
