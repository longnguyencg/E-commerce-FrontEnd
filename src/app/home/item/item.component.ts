import {Component, OnInit} from '@angular/core';
import {Items} from './item.model';
import {ItemService} from './item.service';
import {UserService} from '../../user/user.service';
import {CategoryService} from '../category.service';
import {ICategory} from '../icategory';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Items[] = [];
  user;
  cates: ICategory[] = [];

  constructor(private itemServ: ItemService, private usersService: UserService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.itemServ.cast.subscribe(items => {
      for (const item of items) {
        if (item.display === 1) {
          this.items.push(item);
        }
      }
    });
    this.categoryService.getAll().subscribe(next => {
      this.cates = next;
    });
    this.usersService.cast.subscribe(user => this.user = user);
  }
}
