import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MenuItem, MenuService} from '../services/menu.service';
import {Restaurant, RestaurantService} from "../services/restaurant.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menuFormGroup: FormGroup;
  restaurant: Restaurant;

  constructor(private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              public restaurantService: RestaurantService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getRestaurant(parseInt(this.authService.getUserData().restaurant, 10));
    this.menuFormGroup = new FormGroup({
      pk: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      category: new FormControl(''),
      price: new FormControl('', Validators.maxLength(6)),
      status_available: new FormControl(false),
      restaurant: new FormControl(null),
      alcoholic: new FormControl(false)
    });
    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.menuService.getMenuItemByName(pkFromUrl)
        .subscribe((menuItem) => {
          this.menuFormGroup.patchValue(menuItem);
        });
    }
  }
  createOrUpdateMenu(): void {
    this.menuFormGroup.value.restaurant = this.restaurant.pk;
    const pkFromFormGroup = this.menuFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.menuService.updateMenuItem(this.menuFormGroup.value)
        .subscribe(() => {
          alert('updated successfully!');
        });
    } else {
      // this.menuFormGroup.value.restaurant = this.authService.getUserData().restaurant;
      this.menuService.createMenuItem(this.menuFormGroup.value)
        .subscribe((menuItem) => {
          alert('created successfully!');
        });
    }
  }

  private getRestaurant(pk: number): void {
    this.restaurantService.getRestaurant(pk)
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });
  }
}
