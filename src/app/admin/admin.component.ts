import {Component, OnInit} from '@angular/core';
import {ItemService} from '../home/item/item.service';
import {Items} from '../home/item/item.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  items: Items[];

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.itemService.cast.subscribe(items => {
      this.items = items;
    });
  }

  deleteProduct(id) {
    const item = this.itemService.getItemsById(id);
    this.items.splice(this.items.indexOf(item), 1);
    this.itemService.delete(id).subscribe();
  };
}
