import {Component, OnInit} from '@angular/core';
import {Items} from './item.model';
import {ItemService} from './item.service';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Items[];
  user;

  constructor(private itemServ: ItemService, private usersService: UserService) {
  }

  ngOnInit(): void {
    this.itemServ.cast.subscribe(items => {
      this.items = items;
      for (const item of this.items) {
        if (item.display === 0) {
          this.items.splice(this.items.indexOf(item), 1);
        }
      }
    });
    this.usersService.cast.subscribe(user => this.user = user);
  }
}
