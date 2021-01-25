import { Component, OnInit } from '@angular/core';
import {MenuItem, MenuService} from '../services/menu.service';
import {OrderDetail, OrderService} from '../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant, RestaurantService} from '../services/restaurant.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menuItems: MenuItem[];
  displayedColumns = ['name', 'description', 'price', 'add', 'edit', 'delete'];

  constructor(private menuService: MenuService,
              private orderService: OrderService,
              private restaurantService: RestaurantService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
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

  private addToOrder(menuItem: MenuItem): void {
    alert(menuItem.name + ' is added to the order');
    this.orderService.addToOrder(menuItem)
  }

  deleteMenuItem(menuItem: MenuItem): void {
    this.menuService.deleteMenuItem(menuItem)
      .subscribe(() => {
        this.retrieveMenuItems();
        alert('deleted successfully!');
      });
  }


}
