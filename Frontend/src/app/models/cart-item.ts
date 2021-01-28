export class CartItem {
  id: number;
  name: string;
  qty: number;
  price: number;

  constructor(id = 0, name = '', qty = 0, price = 0) {
    this.id = id
    this.name = name
    this.qty = qty
    this.price = price
  }
}
