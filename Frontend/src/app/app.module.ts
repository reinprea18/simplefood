import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { LogInComponent } from './log-in/log-in.component';
import {MaterialModule} from './material/material.module';
import {MatTableModule} from '@angular/material/table';
import { LandingComponent } from './landing/landing.component';
import { AuthService } from './services/auth.service';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuFormComponent} from './menu-form/menu-form.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import {JwtModule} from '@auth0/angular-jwt';
import { LogOutComponent } from './log-out/log-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TableComponent } from './table/table.component';
import {IsTable} from './services/is-table.service';
import { TableDashboardComponent } from './table-dashboard/table-dashboard.component';
import {OrderListResolver} from './services/order-list.resolver';
import { OrderService } from './services/order.service';
import { TableRequestComponent } from './table-request/table-request.component';

// tslint:disable-next-line:typedef
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantFormComponent,
    LogInComponent,
    MenuListComponent,
    MenuFormComponent,
    LandingComponent,
    EmployeeComponent,
    EmployeeDashboardComponent,
    LogOutComponent,
    SignUpComponent,
    TableComponent,
    TableDashboardComponent,
    TableRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:4200']
      }
    }),
  ],
  providers: [AuthService, IsTable, OrderListResolver, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
