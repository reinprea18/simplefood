import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MenuItem, MenuService} from '../services/menu.service';
import {Restaurant, RestaurantService} from "../services/restaurant.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from '@angular/router';


class MenuData{
  constructor(
    public name?: string,
    public description?: string,
    public category?: string,
    public restaurant?: string,
    public price?: string,
    public status_available?: string,
    public alcoholic?: string,
  ) {
  }
}

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  menuItem: MenuData = new MenuData();
  menuFormGroup: FormGroup;
  restaurants: Restaurant[];

  constructor(private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              public restaurantService: RestaurantService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.retrieveRestaurants();
    this.menuFormGroup = new FormGroup({
      pk: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.maxLength(6)),
      status_available: new FormControl(''),
      restaurant: new FormControl(''),
      alcoholic: new FormControl('')
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
    const pkFromFormGroup = this.menuFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.menuService.updateMenuItem(this.menuFormGroup.value)
        .subscribe(() => {
          alert('updated successfully!');
        });
    } else {
      //this.menuFormGroup.value.restaurant = this.authService.getUserData().restaurant;
      this.menuService.createMenuItem(this.menuFormGroup.value)
        .subscribe((menuItem) => {
          alert('created successfully!');
        });
    }
  }

  createOrUpdateMenu2(): void {
    this.menuService.createOrUpdateMenu2(
      this.menuItem.name,
      this.menuItem.description,
      this.menuItem.category,
      this.menuItem.price,
      this.menuItem.status_available,
      this.menuItem.restaurant = this.authService.getUserData().restaurant,
      this.menuItem.alcoholic,
    ).subscribe(() => {
      this.router.navigateByUrl('/log-in');
    }, (error) => {
      console.error(error);
    });
  }

  private retrieveRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
  }
}
