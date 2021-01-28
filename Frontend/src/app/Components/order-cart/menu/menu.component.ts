import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "../../../services/menu.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() products: any = [];

  constructor(private  productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

}
