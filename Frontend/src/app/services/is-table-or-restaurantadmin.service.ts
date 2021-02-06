import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsTableOrRestaurantadminService {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (AuthService.isTable() || AuthService.isRestaurantAdmin()){
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
