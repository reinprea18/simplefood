import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Order, OrderService, createOrder } from '../../services/order.service';
import {AuthService} from '../../services/auth.service';

import {MatSnackBar,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-dashboard',
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.scss']
})
export class TableDashboardComponent implements OnInit, OnDestroy {
  messages: Subscription;
  orders: Order[];
  nameOfTable: string;
  totalPrice: number;
  received: boolean;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  get requestedOrders(): Order[]{
    return this.orders.filter(order => {
       return order.status === 'REQUESTED';
    });
  }

  get inProgressOrders(): Order[] {
    return this.orders.filter(order => {
      return order.employee !== null && order.status === 'STARTED';
    });
  }

  get receivedOrders(): Order[] {
    return this.orders.filter(order => {
      return order.status === 'IN_PROGRESS';
    });
  }

  ngOnInit(): void {
    this.nameOfTable = AuthService.getUser().username;
    this.route.data.subscribe((data: { orders: Order[] }) => this.orders = data.orders);
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
    console.log('G');
    if (order.status === 'STARTED') {
      this.openSnackBar(`Employee ${order.employee.username} has accepted your order.`);
    } else if (order.status === 'IN_PROGRESS') {
      this.openSnackBar(`Employee ${order.employee.username} is serving your order now.`);
    } else if (order.status === 'COMPLETED') {
      this.openSnackBar(`Paid. Thank you!`);
    }
  }

  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }

  getTotalPrice(): number{
    this.totalPrice = 0;
    this.totalPrice = this.receivedOrders.reduce((sum, current) =>
      sum + parseFloat(current.total_price.toString()), 0);
    return this.totalPrice;
  }

  allReceived(): boolean{
    return this.inProgressOrders.length === 0 && this.requestedOrders.length === 0 && this.receivedOrders.length !== 0;
  }

  updateOrderStatus(status: string): void {
    this.orders.filter(item => item.status === 'IN_PROGRESS').forEach(order => {
      order.employee = AuthService.getUser();
      order.status = status;
      this.orderService.updateOrder(order);
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
