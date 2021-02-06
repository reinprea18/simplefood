import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuService} from '../../../services/menu.service';
import {Restaurant, RestaurantService} from '../../../services/restaurant.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menuItems: MenuItem[];
  restaurant: Restaurant;
  displayedColumns = ['name', 'price', 'edit', 'delete', 'add', 'description'];
  addedToOrder: MenuItem[];

  constructor(private menuService: MenuService,
              private authService: AuthService,
              private restaurantService: RestaurantService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getRestaurant(AuthService.getUser().restaurant);
    const pkFromUrl = this.route.snapshot.paramMap.get('restaurant');
    if (pkFromUrl && AuthService.getUser().group == null) {
      this.menuService.getSingleMenu(parseInt(pkFromUrl, 10))
        .subscribe((menu) => {
          // this.menuItems = menu;
        });
    }
    else if (AuthService.getUser().group == null) {
      // this.retrieveMenuItems();
    }
    else if (pkFromUrl) {
      this.menuService.getSingleMenu(AuthService.getUser().restaurant)
        .subscribe((menu) => {
          this.menuItems = menu;
        });
      this.router.navigate(['/menu-form/']);
    }
    else {
      this.router.navigate(['/menu-list/' + AuthService.getUser().restaurant]);
    }
    this.addedToOrder = new Array();
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

  addToMenuItems(menuItem: MenuItem): void{
    this.addedToOrder.push(menuItem);
  }
}
