import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsTable implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (AuthService.isTable()){
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
