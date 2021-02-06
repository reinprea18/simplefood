import {Component, Input, OnInit} from '@angular/core';
import {MenuItem, MenuService} from '../../../services/menu.service';
import {Restaurant, RestaurantService} from '../../../services/restaurant.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() products: any = [];
  menuItems: MenuItem[];
  menuItemsUnfiltered: MenuItem[];
  restaurant: Restaurant;

  constructor(public menuService: MenuService,
              public restaurantService: RestaurantService,
              public authService: AuthService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRestaurant(AuthService.getUser().restaurant);

    const pkFromUrl = this.route.snapshot.paramMap.get('restaurant');

    if (pkFromUrl && AuthService.getUser().group == null) {
      this.menuService.getSingleMenu(parseInt(pkFromUrl, 10))
        .subscribe((menu) => {
          this.menuItems = menu;
          this.menuItemsUnfiltered = menu;

        });
    }
    else if (AuthService.getUser().group == null) {
      this.retrieveMenuItems();
    }
    else {
      this.menuService.getSingleMenu(AuthService.getUser().restaurant)
        .subscribe((menu) => {
          this.menuItems = menu;
          this.menuItemsUnfiltered = menu;

        });
    }
  }

  private getRestaurant(pk: number): void {
    this.restaurantService.getRestaurant(pk)
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });
  }

  private retrieveMenuItems(): void {
    this.menuService.getAllMenuItems()
      .subscribe((menuItems) => {
        this.menuItems = menuItems.filter(item => item.restaurant.pk === AuthService.getUser().restaurant);
        this.menuItemsUnfiltered = menuItems;
      });
  }

  deleteMenuItem(menuItem: MenuItem): void {
    this.menuService.deleteMenuItem(menuItem)
      .subscribe(() => {
        this.retrieveMenuItems();
        alert('deleted successfully!');
      });
  }

  onValChange(value): void{
    if (value === 'a') {
      this.menuItems = this.menuItemsUnfiltered;
      return;
    }
    this.menuItems = this.menuItemsUnfiltered.filter(
      item => item.category === value);
  }

}
