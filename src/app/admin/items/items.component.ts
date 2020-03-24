import {Component, OnInit} from '@angular/core';
import {Items} from '../../home/item/item.model';
import {ItemService} from '../../home/item/item.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Items[];

  constructor(private itemService: ItemService, private router: Router) {
  }

  ngOnInit(): void {
    this.itemService.cast.subscribe(items => {
      this.items = items;
    });
  }

  deleteProduct(id) {
    if (confirm('Are you sure')) {
      const item = this.itemService.getItemsById(id);
      this.items.splice(this.items.indexOf(item), 1);
      this.itemService.delete(id).subscribe();
    }
  }

  changeToAdd() {
    this.router.navigate(['home/admin/add']);
  }

  hidden(id: number) {
    const display = {
      display: 0
    };
    this.itemService.hidden(id, display).subscribe(next => {
        this.itemService.getItems().subscribe(next1 => {
          this.itemService.updateItems(next1);
        });
      }
    );
  }

  apprear(id: number) {
    const display = {
      display: 1
    };
    this.itemService.hidden(id, display).subscribe(next => {
        this.itemService.getItems().subscribe(next1 => {
          this.itemService.updateItems(next1);
        });
      }
    );
  }
}
