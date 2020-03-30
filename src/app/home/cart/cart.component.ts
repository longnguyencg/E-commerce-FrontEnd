import {Component, OnInit} from '@angular/core';
import {ICartItem} from './ICartItem';
import {ItemService} from '../item/item.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from './cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public items: ICartItem[];
  public total: number;
  public totalTypeProduct: number;
  public coupons: string[];
  public shipping: number;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.loadCart();
    this.totalTypeProduct = this.items.length;
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
    this.totalTypeProduct = cart.length;
    this.cartService.typeOfProduct = cart.length;
  }

  remove(id: number): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (let i = 0; i < cart.length; i++) {
      let item: ICartItem = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

  update(id: number, value: number) {
    if (value < 1) { return; }
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index = -1;
    for (let i = 0; i < cart.length; i++) {
      const item: ICartItem = JSON.parse(cart[i]);
      if (item.product.id == id) {
        index = i;
        break;
      }
    }
    const item: ICartItem = JSON.parse(cart[index]);
    item.quantity = value;
    cart[index] = JSON.stringify(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }
}
