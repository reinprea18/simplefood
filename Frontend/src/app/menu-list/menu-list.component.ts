import { Component, OnInit } from '@angular/core';
import {MenuItem, MenuService} from '../services/menu.service';
import {OrderService} from '../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant, RestaurantService} from '../services/restaurant.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menuItems: MenuItem[];
  restaurant: Restaurant;
  displayedColumns = ['name', 'price', 'edit', 'delete', 'add', 'description'];

  constructor(private menuService: MenuService,
              private orderService: OrderService,
              private authService: AuthService,
              private restaurantService: RestaurantService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRestaurant(parseInt(this.authService.getUserData().restaurant, 10))
    const pkFromUrl = this.route.snapshot.paramMap.get('restaurant');
    if (pkFromUrl) {
      this.menuService.getSingleMenu(pkFromUrl)
        .subscribe((menu) => {
          this.menuItems = menu;
        });
    }
    else {
      this.retrieveMenuItems();
    }
  }

  private retrieveMenuItems(): void {
    this.menuService.getAllMenuItems()
      .subscribe((menuItems) => {
        this.menuItems = menuItems;
      });
  }

  deleteMenuItem(menuItem: MenuItem): void {
    this.menuService.deleteMenuItem(menuItem)
      .subscribe(() => {
        this.retrieveMenuItems();
        alert('deleted successfully!');
      });
  }

  private getRestaurant(pk: number): void {
    this.restaurantService.getRestaurant(pk)
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });
  }



}
