import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {userError} from "@angular/compiler-cli/src/transformers/util";

export interface User {
  user_id: string;
  username: string;
  permissions: string;
  restaurant: string;
  group: string;
}

export const createUser = (data: any): User => {
  return {
    user_id: data.user_id,
    username: data.username,
    permissions: data.permission,
    restaurant: data.restaurant,
    group: data.group,
  };
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }): void {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['landing']);
      }, () => {
        alert('wrong username or password');
      });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn.next(false);
    this.router.navigate(['/log-in']);
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
    if(firstName) {
      formData.append('first_name', firstName);
    } else {
      formData.append('first_name', this.getUserData().restaurant);
    }
    if(lastName) {
      formData.append('last_name', lastName);
      if(group == 'restaurantadmin'){
        formData.append('group', 'restaurantadmin');
      } else{
        formData.append('group', 'employee');
      }
    } else {
      formData.append('last_name', 'table');
      formData.append('group', 'table');
    }
    formData.append('password1', password);
    formData.append('password2', password);
    if(restaurant){
      formData.append('restaurant', restaurant);
    } else {
      formData.append('restaurant', this.getUserData().restaurant);
    }
    return this.http.request<User>('POST', url, { body: formData });
  }

  hasPermission(permission: string): boolean {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      const permissions = decodedToken.permissions;
      return permission in permissions;
    }
    return false;
  }


  getUser(): string {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    if (token) {
      console.log(this.getUserData());
      return decodedToken;
    }
    return undefined;
  }

  getUserData(): User {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    if (token) {
      console.log(this.jwtHelperService.decodeToken(token));
      return this.jwtHelperService.decodeToken(token);
    }
    return undefined;
  }

  getAccessToken(): any {
    return localStorage.getItem(this.accessTokenLocalStorageKey);
  }
}
