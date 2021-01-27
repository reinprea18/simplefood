import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantFormComponent} from './restaurant-form/restaurant-form.component';
import {LandingComponent} from './landing/landing.component';
import {LogInComponent} from './log-in/log-in.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuFormComponent} from './menu-form/menu-form.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {TableComponent} from './table/table.component';
import {IsTable} from './services/is-table.service';
import {TableDashboardComponent} from './table-dashboard/table-dashboard.component';
import {OrderListResolver} from './services/order-list.resolver';
import {TableRequestComponent} from "./table-request/table-request.component";


const routes: Routes = [
  {path: '', redirectTo: 'restaurant-list', pathMatch: 'full'},
  {path: 'restaurant-list', component: RestaurantListComponent},
  {path: 'restaurant-form', component: RestaurantFormComponent},
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent},
  {path: 'menu-list', component: MenuListComponent},
  {path: 'menu-form', component: MenuFormComponent},
  {path: 'menu-list/:restaurant', component: MenuListComponent},
  {path: 'restaurantfood/:name', component: MenuListComponent},
  {path: 'log-in', component: LogInComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'landing', component: LandingComponent },
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent},
  {
    path: 'table',
    component: TableComponent,
    canActivate: [
      IsTable
    ],
    children: [
      {
        path: '',
        component: TableDashboardComponent,
        resolve: { orders: OrderListResolver }
      },
      { path: 'request',
        component: TableRequestComponent
      },
    ]
  },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
