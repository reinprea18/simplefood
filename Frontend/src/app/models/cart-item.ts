import {MenuItem} from "../services/menu.service";

export class CartItem {
  id: number;
  menuItem: MenuItem;
  qty: number;
  price: number;

  constructor(id = 0, menuItem = null, qty = 0, price = 0) {
    this.id = id;
    this.menuItem = menuItem;
    this.qty = qty;
    this.price = price;
  }
}
