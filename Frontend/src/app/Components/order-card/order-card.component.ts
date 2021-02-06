import {Component, Input, OnInit} from '@angular/core';

import {Order} from '../../services/order.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit{
  @Input() title: string;
  @Input() orders: Order[];
  index: number;
  isEmployee: boolean;
  isTable: boolean;

  ngOnInit(): void {
    this.isEmployee = AuthService.isEmployee();
    this.isTable = AuthService.isTable();
  }

  constructor() {}
}
