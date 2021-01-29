import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../../models/cart-item';
import {MsngrService} from '../../../services/msngr.service';
import {Product} from '../../../models/product';
import {MenuItem} from '../../../services/menu.service';
import {Order, OrderDetail, OrderService} from '../../../services/order.service';
import {AuthService, User} from '../../../services/auth.service';
import {Restaurant, RestaurantService} from '../../../services/restaurant.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {element} from 'protractor';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartTotal = 0;
  cartItems: CartItem[] = new Array();
  order: Order;
  restaurant: Restaurant;
  table: User;
  orderFormGroup: FormGroup;
  orderDetail: OrderDetail;

  constructor(private msg: MsngrService,
              private orderService: OrderService,
              private authService: AuthService,
              private restaurantService: RestaurantService) { }

  ngOnInit(): void {

    this.msg.getMsg().subscribe((product: any) => {
      this.addProductToCart(product);
    });

    this.msg.getRemoveMsg().subscribe((product: any) => {
      this.removeProductFromCart(product);
    });

    this.restaurantService.getRestaurant(parseInt(this.authService.getUserData().restaurant, 10))
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });

    this.authService.getUserById(parseInt(this.authService.getUserData().user_id, 10))
      .subscribe((user) => {
        this.table = user;
      });

    this.orderFormGroup = new FormGroup({
      pk: new FormControl(null),
      order_date: new FormControl(null),
      updated: new FormControl(null),
      total_price: new FormControl(null),
      status: new FormControl('r'),
      restaurant: new FormControl(null),
      payment: new FormControl(null),
      employee: new FormControl(null),
      table: new FormControl(null)
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

  createOrder(): void {
    this.orderFormGroup.value.total_price = this.cartTotal;
    this.orderFormGroup.value.restaurant = parseInt(this.authService.getUserData().restaurant, 10);
    this.orderFormGroup.value.table = this.authService.getUserData().user_id;
    console.log(this.orderFormGroup.value);
    this.orderService.createOrder(this.orderFormGroup.value)
      .subscribe((order) => {

        this.cartItems.forEach(item => {

          this.orderDetail = new OrderDetail();

          this.orderDetail.amount = item.qty;
          this.orderDetail.totalprice = item.price * item.qty;
          this.orderDetail.menuitem = item.menuItem.pk;
          this.orderDetail.order = order.pk;

          this.orderService.postOrderDetail(this.orderDetail)
            .subscribe((orderdetail) => {

            });
        });
      });
    this.cartItems = [];
    alert('Order sent!');
  }
}
