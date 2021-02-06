import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsEmployeeOrRestaurantadminService {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (AuthService.isRestaurantAdmin() || AuthService.isEmployee()){
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
