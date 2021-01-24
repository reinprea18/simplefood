import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MenuItem, MenuService} from '../services/menu.service';
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantService} from "../services/restaurant.service";


@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  menuFormGroup: FormGroup;

  constructor(private menuService: MenuService,
              private route: ActivatedRoute,
              public restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.menuFormGroup = new FormGroup({
      pk: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.maxLength(6)),
      status_available: new FormControl(''),
      restaurant: new FormControl('', Validators.required),
      alcoholic: new FormControl('')
    });
    const pkFromUrl = this.route.snapshot.paramMap.get('pk');
    if (pkFromUrl) {
      this.menuService.getMenuItemByName(pkFromUrl)
        .subscribe((menuItem) => {
          this.menuFormGroup.patchValue(menuItem);
        });
    }
  }
  createOrUpdateMenu(): void {
    const pkFromFormGroup = this.menuFormGroup.value.pk;
    if (pkFromFormGroup) {
      this.menuService.updateMenuItem(this.menuFormGroup.value)
        .subscribe(() => {
          alert('updated successfully!');
        });
    } else {
      this.menuService.createMenuItem(this.menuFormGroup.value)
        .subscribe((menuItem) => {
          alert('created successfully!');
        });
    }
  }
}
