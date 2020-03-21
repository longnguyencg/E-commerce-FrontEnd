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
    this.itemServ.onChangeItem.subscribe(
      (items: Items[]) => {
        this.items = items;
      }
    );
    this.items = this.itemServ.onGetItems();
    this.usersService.cast.subscribe(user => this.user = user);
  }
}
