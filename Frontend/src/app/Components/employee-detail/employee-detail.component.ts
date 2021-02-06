import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { AuthService } from '../../services/auth.service';
import {Order, OrderDetail, OrderService} from '../../services/order.service';
import {MenuItem, MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  order: Order;
  displayedColumns = ['menuitem', 'amount',  'price', 'totalprice'];
  orderDetails: OrderDetail[];
  menuItems: MenuItem[];
  totalPrice: number;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private menuService: MenuService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { order: Order }) => this.order = data.order);

    this.menuService.getAllMenuItems()
      .subscribe((menuItems) => {
        this.menuItems = menuItems;
      });

    this.orderService.getOrderDetails(this.order.id)
      .subscribe((details) => {
        this.totalPrice = 0;
        this.orderDetails = details;
        this.totalPrice = details.reduce((sum, current) =>
          sum + parseFloat(current.totalprice.toString()), 0);
      });
  }

  updateOrderStatus(status: string): void {
    this.order.employee = AuthService.getUser();
    this.order.status = status;
    this.orderService.updateOrder(this.order);
  }

  getMenuItemNameByPk(pk: number): MenuItem {
    return this.menuItems.filter(item => item.pk === pk)[0];
  }
}
