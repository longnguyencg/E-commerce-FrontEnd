import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {log} from 'util';
import {Router} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {ItemService} from '../item/item.service';
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  loggedIn;
  numberCartItem;
  constructor(private usersService: UserService, private router: Router, private authService: AuthService,
              private itemService: ItemService,
              private cartService: CartService) {

  }

  ngOnInit(): void {
    this.usersService.cast.subscribe(user => {
      this.user = user;
    });
    this.usersService.castLoggedIn.subscribe(next => {
      this.loggedIn = next;
    });
    this.cartService.cast.subscribe(data => this.numberCartItem = data);
  }
  logout() {
    if (this.loggedIn) {
      this.authService.signOut();
      this.router.navigate(['home']);
    } else {
      this.usersService.logout().subscribe(next => {
        this.router.navigate(['home']);
      });
    }

  }
}
