import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-qrlogin',
  templateUrl: './qrlogin.component.html',
  styleUrls: ['./qrlogin.component.scss']
})
export class QRLoginComponent implements OnInit {

  loginFormGroup;

  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params.username;
    const password = this.route.snapshot.params.password;
    console.log(username, password);
    this.loginFormGroup = this.fb.group({
      username: [username, Validators.required],
      password: [password, Validators.required],
    });
    this.login();
  }

  login(): void {
    this.authService.login(this.loginFormGroup.value);
  }
}
