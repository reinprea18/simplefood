import { Component, OnInit } from '@angular/core';
import {Order} from "../services/order.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table-dashboard',
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.scss']
})
export class TableDashboardComponent implements OnInit {
  orders: Order[];

  constructor(private route: ActivatedRoute) {}

  get currentOrders(): Order[] {
    return this.orders.filter(order => {
      return order.employee !== null && order.status !== 'COMPLETED';
    });
  }

  get completedOrders(): Order[] {
    return this.orders.filter(order => {
      return order.status === 'COMPLETED';
    });
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { orders: Order[] }) => this.orders = data.orders);
  }
}
