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
    this.itemServ.cast.subscribe(items => {
      this.items = items;
    });
    // this.itemServ.getItems().subscribe(items => {
    //   const products = items;
    //   this.items = this.itemServ.items;
    //   for (const item of products) {
    //     item.description = 'haha';
    //     item.imagePath = 'https://5.imimg.com/data5/EH/IU/MY-13191810/moto-g5-plus-500x500.png';
    //     item.reviewCounter = 3;
    //     item.reviews = ['good', 'bad', 'ok'];
    //     item.ratingCounter = 3;
    //     item.ratings = [3, 5, 3];
    //     item.avg = 3.3;
    //     item.extraImages = [
    //       'https://fscl01.fonpit.de/userfiles/6727621/image/2017/lenovo-moto-g5/AndroidPIT-lenovo-moto-g5-1120-w810h462.jpg',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs5vZtDVm21sb-dInaZ-7qJXJCqNKzDTc50UO3-G97A6zGNf5k',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREu8RL-q4hMdHZOu9rSRHLxFCVuRT7yvOHJrKlFmrReO0iWqX0',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOU0ZGLS85pB9_-b692rHeuY1siTxlalWlaybOuNJhbZJMlKNQ',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTR1g_Ee8u3W_6o2oBZipC3L6qsDBb5jD9Dde9qMA1BNDXbFzgL'
    //     ];
    //     this.items.push(item);
    //   }
    //   console.log(this.items);
    // });
    console.log(this.items);
    this.usersService.cast.subscribe(user => this.user = user);
  }
}
