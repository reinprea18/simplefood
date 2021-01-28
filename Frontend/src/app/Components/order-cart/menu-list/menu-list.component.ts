import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  products: Product[] = [];

  constructor(private  productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
