import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from "../../services/menu.service";

@Component({
  selector: 'app-employee',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  displayedColumns = ['username', 'first_name', 'last_name', 'group', 'delete'];

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (AuthService.getUser().group === 'admin') {
      this.fetchUsers();
    }
    else if (AuthService.getUser().group === 'restaurantadmin') {
      this.authService.getUsersFromRestaurant(AuthService.getUser().restaurant.toString())
        .subscribe((users) => {
          this.users = users.filter(item => item.group !== 'table');
        });
    }
  }

  fetchUsers(): void {
    this.authService.getUsers()
      .subscribe((users) => {
        this.users = users.filter(item => item.group !== 'table');
      });
  }

  deleteUser(user: User): void {
    this.authService.deleteUser(user.id)
      .subscribe(() => {
        if (AuthService.getUser().group === 'admin') {
          this.fetchUsers();
          this.router.navigate(['/user']);
          alert('deleted successfully!');
        }
        else if (AuthService.getUser().group === 'restaurantadmin') {
          this.authService.getUsersFromRestaurant(AuthService.getUser().restaurant.toString())
            .subscribe((users) => {
              this.users = users.filter(item => item.group !== 'table');
            });
          this.router.navigate(['/user']);
          alert('deleted successfully!');
        }
      });
  }
}
