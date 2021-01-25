import { Injectable } from '@angular/core';
import {MenuItem, MenuService} from './menu.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import DateTimeFormat = Intl.DateTimeFormat;
import {Restaurant} from "./restaurant.service";
import {User} from "./auth.service";

export interface Order {
  id: number;
  order_date: DateTimeFormat;
  updated: DateTimeFormat;
  total_price: number;
  status: string;
  restaurant: Restaurant;
  payment: number;
  employee: User;
}

@Injectable({
  providedIn: 'root'
})
export class GrandOrderService {

}
