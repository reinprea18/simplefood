import { Component, OnInit } from '@angular/core';
import {Restaurant, RestaurantService} from "../../services/restaurant.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {

  restaurants: Restaurant[];
  userFormGroup: FormGroup;


  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit(): void {
    this.authService.signUp(
      this.userFormGroup.value.username,
      null,
      null,
      null,
      'table',
      AuthService.getUser().restaurant.toString(),
    ).subscribe(() => {
      this.router.navigateByUrl('tables');
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      pk: new FormControl(null),
      username: new FormControl('', Validators.required),
    });
  }
}
