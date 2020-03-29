import {Component, OnInit} from '@angular/core';
import {Items} from '../item/item.model';
import {ItemService} from '../item/item.service';
import {UserService} from '../../user/user.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CategoryService} from '../category.service';
import {ICategory} from '../icategory';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit {
  id;
  items: Items[] = [];
  user;
  cates: ICategory[] = [];

  constructor(private itemServ: ItemService, private usersService: UserService, private route: ActivatedRoute,
              private router: Router, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(next => {
      this.cates = next;
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemServ.getItemsByCategory(this.id).subscribe(items => {
      const arr = [];
      for (const item1 of items ) {
        arr.push(item1[0]);
      }
      for (const item of arr) {
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
      }
      for (const item of arr) {
        if (item.display === 1) {
          this.items.push(item);
        }
      }
    });
    this.usersService.cast.subscribe(user => this.user = user);
  }

  alert(id: number) {
    this.router.navigate(['home/' + id]);
  }
}
