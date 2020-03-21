import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {log} from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;

  constructor(private usersService: UserService) {
  }

  ngOnInit(): void {
    this.usersService.cast.subscribe(user => {
      this.user = user;
    });
  }

}
