import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Restaurant {
  pk?: number,
  name: string,
  category: string,
  street_address: string,
  postcode: number,
  town: string,
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/api/restaurants/');
  }

  getRestaurant(pk: number): Observable<Restaurant> {
    return this.http.get<Restaurant>('/api/restaurants/' + pk + '/');
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>('/api/restaurants', restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.patch('/api/restaurants' + restaurant.pk + '/', restaurant);
  }

  deleteRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.delete('/api/restaurants/' + restaurant.pk + '/');
  }
}
