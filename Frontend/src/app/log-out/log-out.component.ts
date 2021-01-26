import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  isLoggedIn = false;

  constructor(private router: Router,
              private userService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.isLoggedIn
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  logout(): void {
    this.userService.logout();
  }
}
