import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  restaurant: string;
  group: string;
  photo: string;
}

export interface Token {
  access: string;
  refresh: string;
}

export const createUser = (data: any): User => {
  return {
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    role: data.role,
    restaurant: data.restaurant,
    group: data.group,
    photo: data.photo,
  };
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private static parseUserFromAccessToken(accessToken: string): User {
    const [, payload, ] = accessToken.split('.');
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }

  static getUser(): User {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return this.parseUserFromAccessToken(accessToken);
    }
    return undefined;
  }

  static getAccessToken(): string {
    const token = JSON.parse(window.localStorage.getItem('simplefood.auth'));
    if (token) {
      return token.access;
    }
    return undefined;
  }

  signUp(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    group: string,
    restaurant: string,
    role: string,
    photo: any
  ): Observable<User> {
    const url = '/api/sign_up/';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('password1', password);
    formData.append('password2', restaurant);
    formData.append('restaurant', role);
    formData.append('role', password);
    formData.append('group', group);
    formData.append('photo', photo);
    return this.http.request<User>('POST', url, { body: formData });
  }

  logIn(username: string, password: string): Observable<Token> {
    const url = '/api/log_in/';
    return this.http.post<Token>(url, { username, password }).pipe(
      tap(token => localStorage.setItem('simplefood.auth', JSON.stringify(token)))
    );
  }
}
