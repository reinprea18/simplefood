import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MenuItem} from "./menu.service";

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

  permissionGroups: string[] = ['restaurantadmin', 'employee', 'table'];

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
        if(this.getUserData().group === 'table'){
          this.router.navigate(['menu-list']);
        } else if (this.getUserData().group === 'employee' || this.getUserData().group === 'restaurantadmin'){
          this.router.navigate(['orders']);
        } else{
          this.router.navigate(['landing']);
        }

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
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('group', group);
    formData.append('password1', password);
    formData.append('password2', password);
    if (restaurant) {
      formData.append('restaurant', restaurant);
    } else {
      formData.append('restaurant', this.getUserData().restaurant);
    }
    return this.http.request<User>('POST', url, {body: formData});
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

  hasGroup(group: string): boolean {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      const groups = decodedToken.groups;
      return group in groups;
    }
    return false;
  }


  getUser(): string {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    if (token) {
      return decodedToken;
    }
    return undefined;
  }

  getUserData(): User {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token);
    if (token) {
      return this.jwtHelperService.decodeToken(token);
    }
    return undefined;
  }

  getAccessToken(): any {
    return localStorage.getItem(this.accessTokenLocalStorageKey);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users/');
  }

  getUsersFromRestaurant(pk: string): Observable<User[]> {
    return this.http.get<User[]>('/api/users/?restaurant=' + pk);
  }

  getUserById(pk: number): Observable<User> {
    return this.http.get<User>('/api/users/' + pk + '/');
  }

  deleteUser(pk: number): Observable<any> {
    console.log('localhost:8000/users/' + pk + '/')
    return this.http.delete('/api/users/' + pk + '/');
  }
}



