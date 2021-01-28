import { Injectable } from '@angular/core';

import {User, AuthService} from './auth.service';
import {Restaurant} from './restaurant.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import {MenuItem} from './menu.service';
import DateTimeFormat = Intl.DateTimeFormat; // new

export interface Order {
  pk?: number;
  order_date: any;
  updated: any;
  total_price: number;
  status: any;
  restaurant: Restaurant;
  payment: any;
  employee: User;
  table: User;
}

export class OrderDetail{
  pk?: number;
  amount: number;
  menuitem: number;
  order: number;
  totalprice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/orders/', order);
  }

  postOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail>{
    console.log(orderDetail);
    return this.http.post<OrderDetail>('/api/orderdetails/', orderDetail);
  }
}
