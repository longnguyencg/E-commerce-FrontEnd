import {Component, OnInit} from '@angular/core';
import {Items} from '../../home/item/item.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ItemService} from '../../home/item/item.service';
import {FormBuilder, NgForm} from '@angular/forms';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  id: number;
  inItems: Items;
  items: Items[];
  today: number = Date.now();
  editForm;
  arr = [1, 2, 3, 4, 5];
  categoryId: number;

  constructor(private activeRoute: ActivatedRoute, private itemServ: ItemService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.itemServ.cast.subscribe(items => {
      this.items = items;
      this.activeRoute.params.subscribe(
        (params: Params) => {
          this.id = parseFloat(params.id);
          this.inItems = this.itemServ.getItemsById(this.id);
          this.categoryId = this.inItems.category_id;
          this.editForm = this.fb.group({
            name: this.inItems.name,
            price: this.inItems.price,
            category_id: this.inItems.category_id
          });
        }
      );
    });
  }

  update(data) {
    const item = {
      name: data.name,
      price: data.price,
      category_id: data.category_id
    };
    this.itemServ.update(item, this.id).subscribe(next => {
      this.itemServ.getItems().subscribe(next1 => {
        this.itemServ.updateItems(next1);}
      )
      this.router.navigate(['home/admin']);
    });
  }
}
