import { Component } from '@angular/core';

import {AuthService, User} from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private authService: AuthService) {}

  getUser(): string {
    return this.authService.getUser();
  }

  isTable(): boolean {
    return this.authService.getUserData().group === 'table';
  }

  logOut(): void {
    this.authService.logout();
  }
}
