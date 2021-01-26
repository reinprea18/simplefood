import { Injectable } from '@angular/core';

import {User, createUser, AuthService} from './auth.service';
import {Restaurant} from './restaurant.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

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
  constructor(private authService: AuthService, private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    return this.http.get<Order[]>('/api/order/', { headers }).pipe(
      map((orders: Order[]) => orders.map((order: Order) => createOrder(order)))
    );
  }
}
