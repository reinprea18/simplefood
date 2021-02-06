import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MenuItem} from "./menu.service";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  group: string;
  restaurant: number;
  photo: string;
  qr_code: string;
}

export const createUser = (data: any): User => {
  return {
    id: data.id,
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    group: data.group,
    restaurant: data.restaurant,
    photo: data.photo,
    qr_code: data.qr_code,
  };
};

export interface Token {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly accessTokenLocalStorageKey = 'access_token_simplefood';
  isLoggedIn = new BehaviorSubject(false);
  permissionGroups: string[] = ['restaurantadmin', 'employee', 'table'];
  private routerS: Router;

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService) {
    this.routerS = router;
    const token = JSON.parse(window.localStorage.getItem('access_token_simplefood'));
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token.access));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token.access);
      this.isLoggedIn.next(tokenValid);
    }
  }

  static getUser(): User {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return this.parseUserFromAccessToken(accessToken);
    }
    return undefined;
  }

  static getAccessToken(): string {
    const token = JSON.parse(window.localStorage.getItem('access_token_simplefood'));
    if (token) {
      return token.access;
    }
    return undefined;
  }

  static isTable(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'table';
    }
    return false;
  }

  static isEmployee(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'employee';
    }
    return false;
  }

  static isAdmin(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'admin';
    }
    return false;
  }

  static isRestaurantAdmin(): boolean {
    const user = this.getUser();
    if (user) {
      return user.group === 'restaurantadmin';
    }
    return false;
  }

  private static parseUserFromAccessToken(accessToken: string): User {
    const [, payload, ] = accessToken.split('.');
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }

  signUp(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    group: string,
    restaurant: string,
  ): Observable<User> {
    const url = '/api/sign_up/';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    if (group === 'table'){
      formData.append('password1', username);
      formData.append('password2', username);
    } else {
      formData.append('password1', password);
      formData.append('password2', password);
    }
    formData.append('group', group);
    if (restaurant) {
      formData.append('restaurant', restaurant);
    } else {
      formData.append('restaurant', AuthService.getUser().restaurant.toString());
    }
    return this.http.request<User>('POST', url, { body: formData });
  }

  logIn(username: string, password: string): Observable<Token> {
    const url = '/api/log_in/';
    return this.http.post<Token>(url, { username, password }).pipe(
      tap(token => {
        localStorage.setItem(this.accessTokenLocalStorageKey, JSON.stringify(token));
        this.isLoggedIn.next(true);
        }
      )
    );
  }

  logOut(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn.next(false);
    this.router.navigate(['/log-in']);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete('/api/users/' + id + '/');
  }

  updateUser(user: User): Observable<any> {
    return this.http.patch('/api/users/' + user.id + '/', user);
  }

  getUserById(pk: number): Observable<User> {
    return this.http.get<User>('/api/users/' + pk + '/');
  }

  getUsersFromRestaurant(pk: string): Observable<User[]> {
    return this.http.get<User[]>('/api/users/?restaurant=' + pk);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users/');
  }
}
