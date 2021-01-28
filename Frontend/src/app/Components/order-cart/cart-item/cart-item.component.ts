import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from "../../../models/cart-item";
import {MsngrService} from "../../../services/msngr.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem = new CartItem();

  constructor(private msg: MsngrService) { }

  ngOnInit(): void {
  }

  handleRemoveFromCart(): void {
    this.msg.sendRemoveMsg(this.cartItem);
  }

}
