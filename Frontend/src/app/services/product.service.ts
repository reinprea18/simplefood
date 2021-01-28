import { Injectable } from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    new Product(1, 'Product', 'Very Good Pizza asdf asdf asdg asdg asdg asdh sadfasdhg asdfr asdhgas df', 8.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
    new Product(2, 'asdf', 'Very Good Pizza', 8.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
    // tslint:disable-next-line:max-line-length
    new Product(3, 'asdfsags', 'Very Good Pizzaasdfasdgbasfbasb', 9.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
    new Product(4, 'ashasdhasdh', 'Very Good Pizza', 8.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
    new Product(5, 'Prosadhasdduct', 'Very Good Pizzaasdbasdfbasdfbafb', 10.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
    new Product(6, 'Proasdfasduct', 'Very Good Pizzaadsbadfb', 8.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
    new Product(7, 'Proaycxvduct', 'Very Good Pizzabadfbnadfb', 8.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
    new Product(8, 'hnasdfh', 'Very Good Pizzaadfbadfb', 8.90, 'https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg'),
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products
  }
}
