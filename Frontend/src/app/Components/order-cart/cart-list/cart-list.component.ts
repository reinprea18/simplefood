import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../../models/cart-item';
import {MsngrService} from '../../../services/msngr.service';
import {MenuItem} from '../../../services/menu.service';
import {createOrder, Order, OrderDetail, OrderService} from '../../../services/order.service';
import {AuthService, User} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartTotal = 0;
  cartItems: CartItem[] = new Array();
  order: Order = createOrder({});
  orderDetail: OrderDetail;
  messages: Subscription;

  constructor(private msg: MsngrService,
              private orderService: OrderService,
              private router: Router,) { }

  ngOnInit(): void {

    this.msg.getMsg().subscribe((product: any) => {
      this.addProductToCart(product);
    });

    this.msg.getRemoveMsg().subscribe((product: any) => {
      this.removeProductFromCart(product);
    });
  }

  createOrder(): void {
    this.order.table = AuthService.getUser();
    this.order.total_price = this.cartTotal;
    this.order.restaurant = AuthService.getUser().restaurant;
    this.orderService.createOrder(this.order);
    this.messages = this.orderService.messages.subscribe((message: any) => {
      const order: Order = createOrder(message.data);
      this.cartItems.forEach(item => {
        this.orderDetail = new OrderDetail();
        this.orderDetail.amount = item.qty;
        this.orderDetail.totalprice = item.price * item.qty;
        this.orderDetail.menuitem = item.menuItem.pk;
        this.orderDetail.order = order.id;
        this.orderService.postOrderDetail(this.orderDetail)
          .subscribe((orderdetail) => {
          });
      });
      this.cartItems = new Array();
      this.router.navigateByUrl('/table');
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
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price);
    });
  }

  addProductToCart(product: MenuItem): void{

    let productExists = false;

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
        menuItem: product,
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
