import { Injectable } from '@angular/core';

import {User, AuthService} from './auth.service';
import {Restaurant} from './restaurant.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket'; // new

export interface Order {
  id: string;
  order_date: string;
  updated: string;
  total_price: string;
  status: string;
  restaurant: Restaurant;
  payment: string;
  employee: User;
  customer: User;
}

export const createOrder = (data: any): Order => {
  return {
    id: data.id,
    order_date: data.order_date,
    updated: data.updated,
    total_price: data.total_price,
    status: data.status,
    restaurant: data.restaurant,
    payment: data.payment,
    employee: data.employee,
    customer: data.customer,
  };
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  webSocket: WebSocketSubject<any>;
  messages: Observable<any>;

  constructor(private authService: AuthService, private http: HttpClient) {}

  connect(): void {
    if (!this.webSocket || this.webSocket.closed) {
      const accessToken = this.authService.getAccessToken();
      this.webSocket = webSocket(`ws://localhost:8080/simplefood/?token=${accessToken}`);
      this.messages = this.webSocket.pipe(share());
      this.messages.subscribe(message => console.log(message));
    }
  }

  getOrders(): Observable<Order[]> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Order[]>('/api/order/', { headers }).pipe(
      map((orders: Order[]) => orders.map((order: Order) => createOrder(order)))
    );
  }

  createOrder(order: Order): void {
    this.connect();
    const message: any = {
      type: 'create.order',
      data: {
        ...order, order: order.customer.user_id
      }
    };
    this.webSocket.next(message);
  }
}
