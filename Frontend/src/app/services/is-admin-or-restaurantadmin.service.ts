import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class IsAdminOrRestaurantadminService {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (AuthService.isRestaurantAdmin() || AuthService.isAdmin()){
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
