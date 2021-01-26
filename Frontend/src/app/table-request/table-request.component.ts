import { Component, OnInit } from '@angular/core';
import {createOrder, Order, OrderService} from '../services/order.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-table-request',
  templateUrl: './table-request.component.html',
  styleUrls: ['./table-request.component.scss']
})
export class TableRequestComponent {
  order: Order = createOrder({});

  constructor(
    private router: Router,
    private orderService: OrderService,
    private autService: AuthService
  ) {}

  onSubmit(): void {
    this.order.employee = this.autService.getUserData();
    this.orderService.createOrder(this.order);
    this.router.navigateByUrl('/table');
  }
}
