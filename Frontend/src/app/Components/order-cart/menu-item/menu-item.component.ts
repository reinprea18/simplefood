import {Component, Input, OnInit} from '@angular/core';
import {MsngrService} from '../../../services/msngr.service';
import {MenuItem, MenuService} from '../../../services/menu.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;
  menuItems: MenuItem[];
  isRestaurantAdmin: boolean;

  constructor(public msg: MsngrService,
              public menuService: MenuService,
              public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isRestaurantAdmin = AuthService.isRestaurantAdmin();
  }

  handleAddToCart(menuItem: MenuItem): void {
    this.msg.sendMsg(menuItem);
  }

  deleteMenuItem(menuItem: MenuItem): void {
    this.menuService.deleteMenuItem(menuItem)
      .subscribe(() => {
        this.retrieveMenuItems();
        this.router.navigate(['/menu-list']);
        alert('deleted successfully!');
      });
  }

  private retrieveMenuItems(): void {
    this.menuService.getAllMenuItems()
      .subscribe((menuItems) => {
        this.redirectTo('/menu-list');
      });
  }

  redirectTo(uri: string): void{
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
