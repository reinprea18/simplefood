import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsEmployee } from './services/is-employee.service';
import { IsTable } from './services/is-table.service';
import { OrderDetailResolver } from './services/order-detail.resolver';
import { OrderListResolver } from './services/order-list.resolver';

import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { TableComponent } from './components/table/table.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {RestaurantListComponent} from './components/restaurant-list/restaurant-list.component';
import {AuthGuard} from './guards/auth.guard';
import {MenuComponent} from './components/order-cart/menu/menu.component';
import {MenuFormComponent} from './components/menu-form/menu-form.component';
import {RestaurantFormComponent} from './components/restaurant-form/restaurant-form.component';
import {QRLoginComponent} from './components/qrlogin/qrlogin.component';
import {UsersComponent} from './components/users/users.component';
import {IsAdmin} from './services/is-admin.service';
import {IsRestaurantadmin} from './services/is-restaurantadmin.service';
import {IsAdminOrRestaurantadminService} from './services/is-admin-or-restaurantadmin.service';
import {IsEmployeeOrRestaurantadminService} from './services/is-employee-or-restaurantadmin.service';
import {IsTableOrRestaurantadminService} from './services/is-table-or-restaurantadmin.service';
import {TablesComponent} from './components/tables/tables.component';
import {CreateTableComponent} from './components/create-table/create-table.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [
      IsTable
    ],
    children: [
      {
        path: ':id',
        component: TableDetailComponent,
        resolve: { order: OrderDetailResolver }
      },
      {
        path: '',
        component: TableDashboardComponent,
        resolve: { orders: OrderListResolver }
      }
    ]
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [
      IsEmployee
    ],
    children: [
      {
        path: '',
        component: EmployeeDashboardComponent,
        resolve: { orders: OrderListResolver }
      },
      {
        path: ':id',
        component: EmployeeDetailComponent,
        resolve: { order: OrderDetailResolver }
      }
    ]
  },
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'restaurant-list', component: RestaurantListComponent, canActivate: [IsAdmin]},
  {path: 'restaurant-form', component: RestaurantFormComponent, canActivate: [IsAdmin]},
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent, canActivate: [IsAdmin]},
  {path: 'menu-list', component: MenuComponent, canActivate: [IsTableOrRestaurantadminService]},
  {path: 'menu-form', component: MenuFormComponent, canActivate: [IsRestaurantadmin]},
  {path: 'menu-form/:pk', component: MenuFormComponent, canActivate: [IsRestaurantadmin]},
  // {path: 'menu-list/:restaurant', component: MenuListComponent, canActivate: [AuthGuard]},
  // {path: 'restaurantfood/:name', component: MenuListComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent, canActivate: [IsAdminOrRestaurantadminService]},
  {path: 'sign-up/:pk', component: SignUpComponent, canActivate: [IsAdminOrRestaurantadminService]},
  // {path: 'landing', component: LandingComponent, canActivate: [AuthGuard]},
  // {path: 'restaurant-form/:pk', component: RestaurantFormComponent, canActivate: [IsAdmin]},
  {path: 'employee', component: EmployeeComponent, canActivate: [IsEmployeeOrRestaurantadminService]},
  {path: 'employee/:pk', component: EmployeeComponent, canActivate: [IsEmployeeOrRestaurantadminService]},
  {path: 'qrlogin/:username/:password', component: QRLoginComponent},
  {path: 'user', component: UsersComponent, canActivate: [IsAdminOrRestaurantadminService]},
  {path: 'user/:pk', component: UsersComponent, canActivate: [IsAdminOrRestaurantadminService]},
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'tables', component: TablesComponent, canActivate: [IsRestaurantadmin] },
  { path: 'table-form', component: CreateTableComponent, canActivate: [IsRestaurantadmin] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
