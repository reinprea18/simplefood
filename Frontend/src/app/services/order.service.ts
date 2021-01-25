import { Injectable } from '@angular/core';
import {MenuItem, MenuService} from './menu.service';
import {HttpClient} from '@angular/common/http';
import { Order, GrandOrderService} from './grandorder.service';
import {Observable} from "rxjs";

export interface OrderDetail {

  pk: number;
  amount: number;
  total_price: number;
  menu_item: MenuItem;
  order: Order;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderDetail: OrderDetail;

  addToOrder(menuItem: MenuItem): Observable<any>{
    this.orderDetail.amount = this.orderDetail.amount + 1;
    this.orderDetail.total_price = menuItem.price * this.orderDetail.amount;
    this.orderDetail.menu_item = menuItem;
    return
  }
}
