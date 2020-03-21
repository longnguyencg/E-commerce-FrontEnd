import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {log} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;

  constructor(private usersService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.usersService.cast.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.usersService.logout().subscribe(next => {
      this.router.navigate(['login']);
    });
  }
}
