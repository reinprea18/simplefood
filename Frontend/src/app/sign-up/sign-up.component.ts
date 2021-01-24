import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

class UserData{
  constructor(
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public group?: string,
    public photo?: any,
    public restaurant?: string,
    public role?: string,
  ) {
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: UserData = new UserData();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
      this.user.photo = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.authService.signUp(
      this.user.username,
      this.user.firstName,
      this.user.lastName,
      this.user.password,
      this.user.group,
      this.user.photo,
      this.user.role,
      this.user.restaurant
    ).subscribe(() => {
      this.router.navigateByUrl('/log-in');
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
  }

}
