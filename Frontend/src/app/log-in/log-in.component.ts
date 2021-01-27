import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginFormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder, private http: HttpClient, private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.authService.login(this.loginFormGroup.value);
  }
}
