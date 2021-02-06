import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

class UserData {
  constructor(
    public username?: string,
    public password?: string
  ) {}
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  user: UserData = new UserData();
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  onSubmit(): void {
    this.authService.logIn(
      this.user.username, this.user.password
    ).subscribe(user => {
      if (AuthService.isEmployee()){
        this.router.navigate(['/employee']);
      }
      else if (AuthService.isTable()){
        this.router.navigate(['/menu-list']);
      }
      else if (AuthService.isRestaurantAdmin()){
        this.router.navigate(['/user']);
      }
      else if (AuthService.isAdmin()){
        this.router.navigate(['/user']);
      }
      else{
        this.router.navigate(['']);
      }
    }, (error) => {
      alert('Wrong username or password!');
      console.error(error);
    });
  }
}
