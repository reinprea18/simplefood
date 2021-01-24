import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantFormComponent} from './restaurant-form/restaurant-form.component';
import {MenuListComponent} from './menu-list/menu-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'restaurant-list', pathMatch: 'full'},
  {path: 'restaurant-list', component: RestaurantListComponent},
  {path: 'restaurant-form', component: RestaurantFormComponent},
  {path: 'restaurant-form/:pk', component: RestaurantFormComponent},
  {path: 'restaurant-form/:name', component: RestaurantFormComponent},
  {path: 'menu-list', component: MenuListComponent},
  {path: 'menu-list/:restaurant', component: MenuListComponent},
  {path: 'restaurantfood/:name', component: MenuListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
