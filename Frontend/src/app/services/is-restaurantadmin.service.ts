import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsRestaurantadmin {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (AuthService.isRestaurantAdmin()){
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
