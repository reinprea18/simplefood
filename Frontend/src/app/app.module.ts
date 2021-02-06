import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';


import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {NavComponent} from './components/shared/nav/nav.component';
import {MaterialModule} from './components/material/material.module';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {JwtModule} from '@auth0/angular-jwt';
import {EmployeeComponent} from './components/employee/employee.component';
import {EmployeeDetailComponent} from './components/employee-detail/employee-detail.component';
import {EmployeeDashboardComponent} from './components/employee-dashboard/employee-dashboard.component';
import {TableComponent} from './components/table/table.component';
import {TableDashboardComponent} from './components/table-dashboard/table-dashboard.component';
import {TableDetailComponent} from './components/table-detail/table-detail.component';
import {IsEmployee} from './services/is-employee.service';
import {IsTable} from './services/is-table.service';
import {OrderService} from './services/order.service';
import {OrderListResolver} from './services/order-list.resolver';
import {OrderDetailResolver} from './services/order-detail.resolver';
import {QRLoginComponent} from './components/qrlogin/qrlogin.component';
import {MenuService} from './services/menu.service';
import {MsngrService} from './services/msngr.service';
import {RestaurantService} from './services/restaurant.service';
import {CartItemComponent} from './components/order-cart/cart-item/cart-item.component';
import {MenuComponent} from './components/order-cart/menu/menu.component';
import {MenuItemComponent} from './components/order-cart/menu-item/menu-item.component';
import {CartListComponent} from './components/order-cart/cart-list/cart-list.component';
import {MenuListComponent} from './components/order-cart/menu-list/menu-list.component';
import {MenuFormComponent} from './components/menu-form/menu-form.component';
import {RestaurantFormComponent} from './components/restaurant-form/restaurant-form.component';
import {RestaurantListComponent} from './components/restaurant-list/restaurant-list.component';
import {CountryService} from './services/country.service';
import {OrderCartComponent} from './components/order-cart/order-cart.component';
import {UsersComponent} from './components/users/users.component';
import {IsAdmin} from './services/is-admin.service';
import {IsRestaurantadmin} from './services/is-restaurantadmin.service';
import {AuthGuard} from './guards/auth.guard';
import {IsAdminOrRestaurantadminService} from './services/is-admin-or-restaurantadmin.service';
import { TablesComponent } from './components/tables/tables.component';
import { CreateTableComponent } from './components/create-table/create-table.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LogInComponent,
    SignUpComponent,
    OrderCardComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeDashboardComponent,
    LandingComponent,
    TableComponent,
    TableDashboardComponent,
    TableDetailComponent,
    QRLoginComponent,
    OrderCardComponent,
    CartItemComponent,
    CartListComponent,
    MenuComponent,
    MenuItemComponent,
    MenuListComponent,
    MenuFormComponent,
    RestaurantFormComponent,
    RestaurantListComponent,
    OrderCartComponent,
    UsersComponent,
    TablesComponent,
    CreateTableComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    MatIconModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return AuthService.getAccessToken();
        },
        allowedDomains: ['localhost:4200']
      }
    }),
    MatSnackBarModule,
  ],
  providers: [
    AuthService,
    IsEmployee,
    IsTable,
    OrderService,
    OrderListResolver,
    OrderDetailResolver,
    MenuService,
    MsngrService,
    RestaurantService,
    CountryService,
    IsAdmin,
    IsRestaurantadmin,
    AuthGuard,
    IsAdminOrRestaurantadminService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
