import { Injectable } from '@angular/core';
import {Restaurant, RestaurantService} from './restaurant.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "./auth.service";


export interface MenuItem {
  pk: number;
  name: string;
  description: string;
  category: string;
  price: number;
  restaurant: Restaurant;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, private restaurantService: RestaurantService) { }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>('/api/menuitems/');
  }

  getSingleMenu(restaurant: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>('/api/menuitems/?restaurant=' + restaurant);
  }

  createMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.post('/api/menuitems/', menuItem);
  }
  updateMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.patch('/api/menuitems/' + menuItem.pk + '/', menuItem);
  }

  deleteMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.delete('/api/menuitems/' + menuItem.pk + '/');
  }

  getMenuItemByName(name: string): Observable<MenuItem> {
    return this.http.get<MenuItem>('/api/menuitems/?name=' + name);
  }
  getMenuItemById(pk: number): Observable<MenuItem> {
    return this.http.get<MenuItem>('/api/menuitems/' + pk + '/');
  }



}
