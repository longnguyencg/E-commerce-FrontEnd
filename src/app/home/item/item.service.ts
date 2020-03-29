import {Injectable} from '@angular/core';
import {Items} from './item.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Idata} from './idata';
import {IComment} from '../item-detail/IComment';
import {IRate} from '../item-detail/IRate';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  sum = 0;
  url = 'http://127.0.0.1:8000/api/products';
  urlCmt = 'http://127.0.0.1:8000/api/comments';
  urlRate = 'http://127.0.0.1:8000/api/votes';
  items: Items[] = [];
  itemData = new BehaviorSubject<Items[]>(this.items);
  cast = this.itemData.asObservable();

  constructor(private http: HttpClient) {
    this.getItems().subscribe(items => {
      const itemss = [];
      for (const product of items) {
        itemss.push(product[0]);
      }
      for (const item of itemss) {
        item.imagePath = 'https://5.imimg.com/data5/EH/IU/MY-13191810/moto-g5-plus-500x500.png';
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
    });
  }

  updateItems(items) {
    for (const item of items) {
      item.imagePath = 'https://5.imimg.com/data5/EH/IU/MY-13191810/moto-g5-plus-500x500.png';
      item.extraImages = [
        'https://fscl01.fonpit.de/userfiles/6727621/image/2017/lenovo-moto-g5/AndroidPIT-lenovo-moto-g5-1120-w810h462.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs5vZtDVm21sb-dInaZ-7qJXJCqNKzDTc50UO3-G97A6zGNf5k',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREu8RL-q4hMdHZOu9rSRHLxFCVuRT7yvOHJrKlFmrReO0iWqX0',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOU0ZGLS85pB9_-b692rHeuY1siTxlalWlaybOuNJhbZJMlKNQ',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTR1g_Ee8u3W_6o2oBZipC3L6qsDBb5jD9Dde9qMA1BNDXbFzgL'
      ];
    }
    this.itemData.next(items);
  }

  hidden(id, display): Observable<any> {
    return this.http.patch<any>(this.url + '/' + id, display);
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

  addRating(newRate): Observable<IRate> {
    return this.http.post<IRate>(this.urlRate, newRate);
  }

  addReview(cmt): Observable<IComment> {
    return this.http.post<IComment>(this.urlCmt, cmt);
  }

  getReview(id): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.urlCmt + '/' + id);
  }

  delete(id): Observable<Idata> {
    return this.http.delete<Idata>(this.url + '/' + id);
  }

  add(item: Items): Observable<Items> {
    return this.http.post<Items>(this.url, item);
  }

  update(item, id): Observable<object> {
    return this.http.put<object>(this.url + '/' + id, item);
  }

  addItem(item): Observable<Items> {
    return this.http.post<Items>(this.url, item);
  }

  getItemsByCategory(id): Observable<Items[]> {
    return this.http.get<Items[]>(this.url + '/category/' + id);
  }
}
