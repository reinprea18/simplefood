import { Component, OnInit } from '@angular/core';
import {AuthService, User} from "../services/auth.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  users: User[];
  displayedColumns = ['username', 'first_name', 'last_name'];
  constructor( public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsers();
  }

}
