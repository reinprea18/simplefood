import { Component, OnInit } from '@angular/core';
import {AuthService, User} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  users: User[];
  displayedColumns = ['username', 'first_name', 'last_name', 'group'];

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl && this.authService.getUserData().group == null) {
      this.authService.getUsersFromRestaurant(pkFromUrl)
        .subscribe((users) => {
          this.users = users;
        });
    }
    else if (this.authService.getUserData().group == null) {
      this.fetchUsers();
    }
    else if (pkFromUrl) {
      this.authService.getUsersFromRestaurant(this.authService.getUserData().restaurant)
        .subscribe((users) => {
          this.users = users;
        });
    }
    else {
      this.router.navigate(['/employee/' + this.authService.getUserData().restaurant]);
    }
  }

  fetchUsers(): void {
    this.authService.getUsers()
      .subscribe((users) => {
        this.users = users;
      });
  }

}
