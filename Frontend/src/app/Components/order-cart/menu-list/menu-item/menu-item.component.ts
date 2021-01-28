import {Component, Input, OnInit} from '@angular/core';
import {MsngrService} from "../../../../services/msngr.service";
import {Product} from "../../../../models/product";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() productItem: Product

  constructor(private msg: MsngrService ) { this.productItem = new Product()}

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem)
  }
}
