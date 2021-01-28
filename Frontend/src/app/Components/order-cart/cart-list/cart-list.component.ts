import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../models/cart-item";
import {MsngrService} from "../../../services/msngr.service";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartTotal = 0;

  cartItems: CartItem[] = new Array()

  constructor(private msg: MsngrService) { }

  ngOnInit(): void {

    this.msg.getMsg().subscribe((product:any) => {
      this.addProductToCart(product)
    })

    this.msg.getRemoveMsg().subscribe((product:any) => {
      this.removeProductFromCart(product);
    })
  }

  removeProductFromCart(cartItem: CartItem){

    for(let i in this.cartItems) {
      if (this.cartItems[i].id === cartItem.id) {
        if(this.cartItems[i].qty > 1){
          this.cartItems[i].qty--
        } else {
          this.cartItems.forEach( (item, index) => {
            if(item === cartItem) this.cartItems.splice(index,1);
          })
        }
      }
    }

  }

  addProductToCart(product: Product){

    let productExists = false

    for(let i in this.cartItems) {
      if (this.cartItems[i].id === product.id) {
        this.cartItems[i].qty++
        productExists=true
        break;
      }
    }

    if(!productExists) {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        qty: 1,
        price: product.price
      })
    }

    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }
}
