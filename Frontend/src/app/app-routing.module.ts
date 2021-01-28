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
import {TableRequestComponent} from './table-request/table-request.component';
import {AuthGuard} from './guards/auth.guard';
import {EmployeeComponent} from "./employee/employee.component";
import {MenuComponent} from "./Components/order-cart/menu/menu.component";


const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'restaurant-list', component: RestaurantListComponent, canActivate: [AuthGuard]},
  {path: 'restaurant-form', component: RestaurantFormComponent, canActivate: [AuthGuard]},
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent, canActivate: [AuthGuard]},
  {path: 'menu-list', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'menu-form', component: MenuFormComponent, canActivate: [AuthGuard]},
  {path: 'menu-form/:pk', component: MenuFormComponent, canActivate: [AuthGuard]},
  {path: 'menu-list/:restaurant', component: MenuListComponent, canActivate: [AuthGuard]},
  {path: 'restaurantfood/:name', component: MenuListComponent, canActivate: [AuthGuard]},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard]},
  {path: 'landing', component: LandingComponent, canActivate: [AuthGuard]},
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent, canActivate: [AuthGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'employee/:pk', component: EmployeeComponent, canActivate: [AuthGuard]},
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
