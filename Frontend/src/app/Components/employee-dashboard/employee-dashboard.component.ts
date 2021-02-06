import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { Order, OrderService, createOrder } from '../../services/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy {
  messages: Subscription;
  orders: Order[];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  get currentOrders(): Order[] {
    return this.orders.filter((order: Order) => {
      return order.employee !== null && order.status === 'IN_PROGRESS';
    });
  }

  get requestedOrders(): Order[] {
    return this.orders.filter((order: Order) => order.status === 'REQUESTED');
  }

  get inProgressOrders(): Order[] {
    return this.orders.filter(order => {
      return order.employee !== null && order.status === 'STARTED';
    });
  }

  get paymentRequest(): Order[] {
    return this.orders.filter(order => {
      return order.employee !== null && order.status === 'PAY';
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { orders: Order[] }) => {
      this.orders = data.orders;
    });
    this.orderService.connect();
    this.messages = this.orderService.messages.subscribe((message: any) => {
      const order: Order = createOrder(message.data);
      this.updateOrders(order);
      this.updateToast(order);
    });
  }

  updateOrders(order: Order): void {
    this.orders = this.orders.filter((thisOrder: Order) => thisOrder.id !== order.id);
    this.orders.push(order);
  }

  updateToast(order: Order): void {
    if (order.employee === null) {
      this.openSnackBar(`Table ${order.table.username} has requested a order.`);
    }
    if (order.status === 'PAY') {
      this.openSnackBar(`Table ${order.table.username} would like to pay.`);
    }
  }

  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
