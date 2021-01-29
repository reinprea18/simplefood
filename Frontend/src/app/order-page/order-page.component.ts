import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from '../services/menu.service';
import {Order, OrderDetail, OrderService} from '../services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  orders: Order[];
  displayedColumns = ['table', 'status', 'price', 'detail'];
  displayedColumns2 = ['amount', 'menuitem'];
  orderDetails: OrderDetail[];

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService) {}

  ngOnInit(): void {
    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.orderService.getOrdersForRestaurant(this.authService.getUserData().restaurant)
        .subscribe((orders) => {
          this.orders = orders;
        });
      this.orderService.getOrderDetails(parseInt(pkFromUrl, 10))
        .subscribe((details) => {
          this.orderDetails = details;
        });
    }
    else {
      this.orderService.getOrdersForRestaurant(this.authService.getUserData().restaurant)
        .subscribe((orders) => {
          this.orders = orders;
          this.router.navigate(['/orders/' + orders[0].pk]);
        });
    }
  }

  reloadPage(pk): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/orders/' + pk]);
    });
  }
}
