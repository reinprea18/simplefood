import { Component, OnInit } from '@angular/core';
import {AuthService, User} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "../services/menu.service";
import {Order} from "../services/order.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  orders: Order[];
  //displayedColumns = ['username', 'first_name', 'last_name', 'group', 'edit'];

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const pkFromUrl = this.route.snapshot.paramMap.get('pk');

  }


}
