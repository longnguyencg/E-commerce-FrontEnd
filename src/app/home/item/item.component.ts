import {Component, OnInit} from '@angular/core';
import {Items} from './item.model';
import {ItemService} from './item.service';
import {UserService} from '../../user/user.service';
import {CategoryService} from '../category.service';
import {ICategory} from '../icategory';
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Items[] = [];
  itemsData: Items[] = [];
  user;
  cates: ICategory[] = [];
  cateName: string;
  text = '';

  constructor(
    private itemServ: ItemService,
    private usersService: UserService,
    private categoryService: CategoryService,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.itemServ.cast.subscribe(items => {
      for (const item of items) {
        if (item.display === 1) {
          this.items.push(item);
          this.itemsData.push(item);
        }
      }
    });
    this.categoryService.getAll().subscribe(next => {
      this.cates = next;
    });
    this.usersService.cast.subscribe(user => this.user = user);
  }

  listOfCate(id) {
    for (const cate of this.cates) {
      if (cate.id === id) {
        this.cateName = cate.name;
      }
    }
    this.items = [];
    this.itemsData = [];
    this.itemServ.getItemsByCategory(id).subscribe(items => {
      const arr = [];
      for (const item1 of items ) {
        arr.push(item1[0]);
      }
      for (const item of arr) {
        item.imagePath = 'https://5.imimg.com/data5/EH/IU/MY-13191810/moto-g5-plus-500x500.png';
        item.extraImages = [
          'https://fscl01.fonpit.de/userfiles/6727621/image/2017/lenovo-moto-g5/AndroidPIT-lenovo-moto-g5-1120-w810h462.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs5vZtDVm21sb-dInaZ-7qJXJCqNKzDTc50UO3-G97A6zGNf5k',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREu8RL-q4hMdHZOu9rSRHLxFCVuRT7yvOHJrKlFmrReO0iWqX0',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOU0ZGLS85pB9_-b692rHeuY1siTxlalWlaybOuNJhbZJMlKNQ',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTR1g_Ee8u3W_6o2oBZipC3L6qsDBb5jD9Dde9qMA1BNDXbFzgL'
        ];
      }
      for (const item of arr) {
        if (item.display === 1) {
          this.items.push(item);
          this.itemsData.push(item);
        }
      }
    });
  }
  backToHome() {
    this.items = [];
    this.itemsData = [];
    this.cateName = '';
    this.ngOnInit();
  }
  filterSeach(value): Items[] {
    return this.itemsData.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  searchText(value) {
    this.text = value;
    if (this.filterSeach(this.text).length === 0) {
      this.items = this.itemsData;
    } else {
      this.items = this.filterSeach(this.text);
    }
  }
  addToCart(id: number) {
    this.cartService.addToCart(id);
  }
}
