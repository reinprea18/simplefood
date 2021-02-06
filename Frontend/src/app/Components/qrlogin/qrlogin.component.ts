import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

class UserData {
  constructor(
    public username?: string,
    public password?: string
  ) {}
}

@Component({
  selector: 'app-qrlogin',
  templateUrl: './qrlogin.component.html',
  styleUrls: ['./qrlogin.component.scss']
})
export class QRLoginComponent implements OnInit {

  user: UserData = new UserData();

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.user.username = this.route.snapshot.params.username;
    this.user.password = this.route.snapshot.params.password;
    this.authService.logIn(
      this.user.username, this.user.password
    ).subscribe(user => {
      this.router.navigateByUrl('');
    }, (error) => {
      alert('Wrong username or password!');
      console.error(error);
    });
  }
}
