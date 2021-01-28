import {Component, Input, OnInit} from '@angular/core';
import {MsngrService} from "../../../../services/msngr.service";
import {Product} from "../../../../models/product";
import {MenuItem} from "../../../../services/menu.service";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;

  constructor(private msg: MsngrService ) { }

  ngOnInit(): void {
  }

  handleAddToCart(menuItem: MenuItem): void {
    this.msg.sendMsg(menuItem);
  }
}
