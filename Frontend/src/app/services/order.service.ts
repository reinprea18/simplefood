import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { map, share } from 'rxjs/operators';

import { AuthService, User, createUser } from './auth.service';

export interface Order {
  id: string;
  order_date: string;
  updated: string;
  total_price: number;
  status: string;
  restaurant: any;
  payment: string;
  employee: User;
  table: User;
  otherUser: User;
}

export class OrderDetail{
  pk?: number;
  amount: number;
  menuitem: number;
  order: string;
  totalprice: number;
}

export const createOrder = (data: any): Order => {
  const employee = data.employee ? createUser(data.employee) : null;
  const table = data.table ? createUser(data.table) : null;
  const otherUser = AuthService.isTable() ? employee : table;
  return {
    id: data.id,
    order_date: data.order_date,
    updated: data.updated,
    total_price: data.total_price,
    status: data.status,
    restaurant: data.restaurant,
    payment: data.payment,
    employee,
    table,
    otherUser
  };
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  webSocket: WebSocketSubject<any>;
  messages: Observable<any>;

  constructor(private http: HttpClient) {}

  connect(): void {
    if (!this.webSocket || this.webSocket.closed) {
      const accessToken = AuthService.getAccessToken();
      this.webSocket = webSocket(`ws://localhost:8000/simplefood/?token=${accessToken}`);
      this.messages = this.webSocket.pipe(share());
      this.messages.subscribe(message => console.log(message));
    }
  }

  getOrders(): Observable<Order[]> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Order[]>('/api/order/', { headers }).pipe(
      map((orders: Order[]) => orders.map((order: Order) => createOrder(order)))
    );
  }

  createOrder(order: Order): any {
    this.connect();
    const message: any = {
      type: 'create.order',
      data: {
        ...order, table: order.table.id
      }
    };
    this.webSocket.next(message);
  }

  getOrder(id: string): Observable<Order> {
    const accessToken = AuthService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Order>(`/api/order/${id}/`, { headers }).pipe(
      map((order: Order) => createOrder(order))
    );
  }

  updateOrder(order: Order): void {
    this.connect();
    const message: any = {
      type: 'update.order',
      data: {
        ...order, employee: order.employee.id, table: order.table.id, restaurant: order.restaurant.id
      }
    };
    this.webSocket.next(message);
  }

  postOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail>{
    return this.http.post<OrderDetail>('/api/orderdetails/', orderDetail);
  }

  getOrderDetails(order: string): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>('/api/orderdetails/?order=' + order);
  }
}
