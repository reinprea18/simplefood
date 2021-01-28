import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../../models/cart-item';
import {MsngrService} from '../../../services/msngr.service';
import {Product} from '../../../models/product';
import {MenuItem} from '../../../services/menu.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartTotal = 0;

  cartItems: CartItem[] = new Array();

  constructor(private msg: MsngrService) { }

  ngOnInit(): void {

    this.msg.getMsg().subscribe((product: any) => {
      this.addProductToCart(product);
    });

    this.msg.getRemoveMsg().subscribe((product: any) => {
      this.removeProductFromCart(product);
    });
  }

  removeProductFromCart(cartItem: CartItem): void{

    for (const i in this.cartItems) {
      if (this.cartItems[i].id === cartItem.id) {
        if (this.cartItems[i].qty > 1){
          this.cartItems[i].qty--;
        } else {
          this.cartItems.forEach( (item, index) => {
            if (item === cartItem) { this.cartItems.splice(index, 1); }
          });
        }
      }
    }

  }

  addProductToCart(product: MenuItem): void{

    let productExists = false;

    console.log(product);

    for (const i in this.cartItems) {
      if (this.cartItems[i].id === product.pk) {
        this.cartItems[i].qty++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        id: product.pk,
        name: product.name,
        qty: 1,
        price: product.price
      });
    }

    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price);
    });
  }
}
