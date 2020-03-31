import {Injectable} from '@angular/core';
import {ICartItem} from './ICartItem';
import {ItemService} from '../item/item.service';
import {HttpClient} from '@angular/common/http';
import {Items} from '../item/item.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public typeOfProduct: number = 0;
  cartNumber = new BehaviorSubject<number>(this.typeOfProduct);
  cast = this.cartNumber.asObservable();
  urlCheckOut = 'http://127.0.0.1:8000/api/check-out';

  constructor(
    private itemService: ItemService,
    private http: HttpClient,
  ) {
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    this.typeOfProduct = cart.length;
  }
  loadCartAgain() {
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    this.typeOfProduct = cart.length;
  }

  updateTypeOfCart(data) {
    this.cartNumber.next(data);
  }

  checkOut(bill): Observable<any> {
    return this.http.post<any>(this.urlCheckOut, bill);
  }

  addToCart(id: number) {
    if (id) {
      const item: ICartItem = {
        product: this.itemService.getItemsById(id),
        quantity: 1
      };
      if (localStorage.getItem('cart') == null) {
        const cart: any = [];
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
        this.typeOfProduct = 1;
      } else {
        const cart: any = JSON.parse(localStorage.getItem('cart'));
        let index = -1;
        for (let i = 0; i < cart.length; i++) {
          const item: ICartItem = JSON.parse(cart[i]);
          if (item.product.id == id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
          this.typeOfProduct++;
        } else {
          const item: ICartItem = JSON.parse(cart[index]);
          item.quantity += 1;
          cart[index] = JSON.stringify(item);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
      // this.loadCart();
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.updateTypeOfCart(cart.length);
    } else {
      // this.loadCart();
    }
  }
}
