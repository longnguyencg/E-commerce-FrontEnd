import {Injectable} from '@angular/core';
import {Items} from './item.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  sum = 0;
  url = 'http://127.0.0.1:8000/api/products';
  items: Items[] = [];
  itemData = new BehaviorSubject<Items[]>(this.items);
  cast = this.itemData.asObservable();

  constructor(private http: HttpClient) {
    this.getItems().subscribe(items => {
      const products = items;
      for (const item of products) {
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
      this.updateItems(this.items);
      console.log(this.items);
    });
  }

  updateItems(items) {
    this.itemData.next(items);
  }

  getItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.url);
  }

  onGetItems() {
    return this.items;
  }

  getItemsById(id: number): Items {
    for (const item of this.items) {
      if (item.id === id) {
        return item;
      }
    }
  }

  addRating(index: number, newRate: number) {
    const item = this.getItemsById(index);
    item.ratings.push(newRate);
    item.ratingCounter++;

    this.sum = 0;

    for (const rate of item.ratings) {
      this.sum = this.sum + rate;
    }
    item.avg = parseFloat((this.sum / item.ratingCounter).toFixed(1));
    // this.onChangeItem.next(this.items.slice());
  }

  addReview(index: number, newReview: string) {
    const item = this.getItemsById(index);
    item.reviews.push(newReview);
    item.reviewCounter++;
    // this.onChangeItem.next(this.items.slice());
  }
}
