import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  users: User[];
  displayedColumns = ['username', 'qr_code', 'delete'];

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUsersFromRestaurant(AuthService.getUser().restaurant.toString())
      .subscribe((users) => {
        this.users = users.filter(item => item.group === 'table');
        console.log(this.users[1].photo);
      });
  }

  deleteUser(user: User): void {
    this.authService.deleteUser(user.id)
      .subscribe(() => {
        this.authService.getUsersFromRestaurant(AuthService.getUser().restaurant.toString())
          .subscribe((users) => {
            this.users = users.filter(item => item.group === 'table');
          });
        this.router.navigate(['/tables']);
        alert('deleted successfully!');
      });
  }
}
