import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'restaurant-list', pathMatch: 'full'},
  {path: 'restaurant-list', component: RestaurantListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
