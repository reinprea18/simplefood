import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantFormComponent} from './restaurant-form/restaurant-form.component';
import {LandingComponent} from './landing/landing.component';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuFormComponent} from "./menu-form/menu-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'restaurant-list', pathMatch: 'full'},
  {path: 'restaurant-list', component: RestaurantListComponent},
  {path: 'restaurant-form', component: RestaurantFormComponent},
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent},
  {path: 'restaurant-form/:name', component: RestaurantFormComponent},
  {path: 'menu-list', component: MenuListComponent},
  {path: 'menu-form', component: MenuFormComponent},
  {path: 'menu-list/:restaurant', component: MenuListComponent},
  {path: 'restaurantfood/:name', component: MenuListComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
