import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Restaurant, RestaurantService} from '../../services/restaurant.service';
import {MenuService} from '../../services/menu.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {

  menuFormGroup: FormGroup;
  restaurant: Restaurant;

  constructor(private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              public restaurantService: RestaurantService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getRestaurant(AuthService.getUser().restaurant);
    this.menuFormGroup = new FormGroup({
      pk: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      category: new FormControl(''),
      price: new FormControl('', Validators.maxLength(6)),
      restaurant: new FormControl(null),
      image: new FormControl('')
    });
    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.menuService.getMenuItemById(parseInt(pkFromUrl, 10))
        .subscribe((menuItem) => {
          this.menuFormGroup.patchValue(menuItem);
        });
    }
  }

  onChange(event): void {

    if (event.target.files && event.target.files.length > 0) {
      this.menuFormGroup.value.image = event.target.files[0];
    }
  }

  createOrUpdateMenu(): void {
    this.menuFormGroup.value.restaurant = this.restaurant.pk;
    const pkFromFormGroup = this.menuFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.menuService.updateMenuItem(this.menuFormGroup.value)
        .subscribe(() => {
          alert('updated successfully!');
          this.router.navigate(['/menu-list']);
        });
    } else {
      // this.menuFormGroup.value.restaurant = this.authService.getUserData().restaurant;
      this.menuService.createMenuItem(this.menuFormGroup.value)
        .subscribe((menuItem) => {
          console.log(menuItem.image);
          alert('created successfully!');
          this.router.navigate(['/menu-list']);
        });
    }
  }

  private getRestaurant(pk: number): void {
    this.restaurantService.getRestaurant(pk)
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });
  }
}
