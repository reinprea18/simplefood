import {Component, Input, OnInit} from '@angular/core';
import {MenuItem, MenuService} from "../../../services/menu.service";
import {ProductService} from "../../../services/product.service";
import {Restaurant, RestaurantService} from "../../../services/restaurant.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() products: any = [];
  menuItems: MenuItem[];
  restaurant: Restaurant;

  constructor(private  productService: ProductService,
              private menuService: MenuService,
              private restaurantService: RestaurantService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRestaurant(parseInt(this.authService.getUserData().restaurant, 10));

    const pkFromUrl = this.route.snapshot.paramMap.get('restaurant');

    if (pkFromUrl && this.authService.getUserData().group == null) {
      this.menuService.getSingleMenu(pkFromUrl)
        .subscribe((menu) => {
          this.menuItems = menu;
        });
    }
    else if (this.authService.getUserData().group == null) {
      this.retrieveMenuItems();
    }
    else {
      this.menuService.getSingleMenu(this.authService.getUserData().restaurant)
        .subscribe((menu) => {
          this.menuItems = menu;
        });
    }

    this.products = this.productService.getProducts();
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

}
