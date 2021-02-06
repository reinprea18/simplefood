import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Order, OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailResolver implements Resolve<Order> {
  constructor(private orderService: OrderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> {
    return this.orderService.getOrder(route.params.id);
  }
}
