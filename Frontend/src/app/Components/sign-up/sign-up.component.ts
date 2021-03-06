import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { AuthService } from '../../services/auth.service';
import {Restaurant, RestaurantService} from '../../services/restaurant.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

class UserData {
  constructor(
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public group?: string,
    public restaurant?: any,
    // tslint:disable-next-line:variable-name
  ) {}
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: UserData = new UserData();
  restaurants: Restaurant[];
  permissionGroups: string[];
  userFormGroup: FormGroup;
  isAdmin: boolean;


  constructor(
    private router: Router,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) {
  }

  onChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
      this.userFormGroup.value.photo = event.target.files[0];
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
      this.router.navigateByUrl('/user');
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.retrieveRestaurants();
    this.isAdmin = AuthService.isAdmin();
    if (AuthService.isRestaurantAdmin()) {
      this.permissionGroups = this.authService.permissionGroups.filter(item => item !== 'table');
    } else {
      this.permissionGroups = this.authService.permissionGroups.filter(item => item !== 'table');
    }

    this.userFormGroup = new FormGroup({
      pk: new FormControl(null),
      username: new FormControl('', Validators.required),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      password: new FormControl(''),
      permissionGroup: new FormControl(null, Validators.required),
      restaurant: new FormControl(null),
    });

    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.authService.getUserById(parseInt(pkFromUrl, 10))
        .subscribe((user) => {
          this.userFormGroup.patchValue(user);
        });
    }
  }

  private retrieveRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
  }
}
