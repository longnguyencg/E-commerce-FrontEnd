import {Component, OnInit} from '@angular/core';
import {Items} from '../../home/item/item.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ItemService} from '../../home/item/item.service';
import {FormBuilder, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  id: number;
  inItems: Items;
  items: Items[] = [];
  editForm;
  categoryId: number;

  constructor(private activeRoute: ActivatedRoute, private itemServ: ItemService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.itemServ.getItems().subscribe(items => {
        for (const item of items) {
          item.description = 'haha';
          item.imagePath = 'https://5.imimg.com/data5/EH/IU/MY-13191810/moto-g5-plus-500x500.png';
          item.reviewCounter = 3;
          item.reviews = ['good', 'bad', 'ok'];
          item.ratingCounter = 3;
          item.ratings = [3, 5, 3];
          item.avg = 3.3;
          item.extraImages = [
            'https://fscl01.fonpit.de/userfiles/6727621/image/2017/lenovo-moto-g5/AndroidPIT-lenovo-moto-g5-1120-w810h462.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs5vZtDVm21sb-dInaZ-7qJXJCqNKzDTc50UO3-G97A6zGNf5k',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREu8RL-q4hMdHZOu9rSRHLxFCVuRT7yvOHJrKlFmrReO0iWqX0',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOU0ZGLS85pB9_-b692rHeuY1siTxlalWlaybOuNJhbZJMlKNQ',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTR1g_Ee8u3W_6o2oBZipC3L6qsDBb5jD9Dde9qMA1BNDXbFzgL'
          ];
          this.items.push(item);
        }
        this.activeRoute.params.subscribe(
          (params: Params) => {
            this.id = parseFloat(params.id);
            this.inItems = this.itemServ.getItemsById(this.id);
            this.categoryId = this.inItems.category_id;
            this.editForm = this.fb.group({
              name: [this.inItems.name, [Validators.required, Validators.minLength(4)]],
              price: [this.inItems.price, [Validators.required]],
              category_id: [this.inItems.category_id, [Validators.required]]
            });
          }
        );
      }
    );
  }

  update(data) {
    const item = {
      name: data.name,
      price: data.price,
      category_id: data.category_id
    };
    this.itemServ.update(item, this.id).subscribe(next => {
      this.itemServ.getItems().subscribe(next1 => {
          this.itemServ.updateItems(next1);
        }
      );
      this.router.navigate(['home/admin']);
    });
  }

  get name() {
    return this.editForm.get('name');
  }

  get price() {
    return this.editForm.get('price');
  }

  get category() {
    return this.editForm.get('category_id');
  }

  cancel() {
    this.router.navigate(['home/admin']);
  }
}
