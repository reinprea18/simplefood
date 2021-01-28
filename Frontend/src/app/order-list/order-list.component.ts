import {Component, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from '../services/menu.service';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('orderItems') orderItems: MenuItem[];

  /*deleteFromOrderList(menuItem: MenuItem): void{
    this.orderItemsChange.emit(menuItem);
  }*/
}
