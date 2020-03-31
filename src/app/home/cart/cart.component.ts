import {Component, OnInit} from '@angular/core';
import {ICartItem} from './ICartItem';
import {ItemService} from '../item/item.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from './cart.service';
import {UserService} from '../../user/user.service';

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
  user;
  details;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private usersService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadCart();
    this.cartService.cast.subscribe(data => this.totalTypeProduct = data);
  }

  loadCart(): void {
    this.usersService.cast.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.total = 0;
        this.items = [];
        let cart = JSON.parse(localStorage.getItem('cart'));
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < cart.length; i++) {
          let item = JSON.parse(cart[i]);
          this.items.push({
            image: 'https://5.imimg.com/data5/EH/IU/MY-13191810/moto-g5-plus-500x500.png',
            product: item.product,
            quantity: item.quantity
          });
          this.total += item.product.price * item.quantity;
        }
        this.totalTypeProduct = cart.length;
        this.cartService.typeOfProduct = cart.length;
      }
    });
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
    this.cartService.updateTypeOfCart(cart.length)
  }

  checkOut() {
    this.usersService.getDetails(this.user.id).subscribe(detail => {
      this.details = detail;
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      const listItem = [];
      for (let y = 0; y < cart.length; y++) {
        let item: ICartItem = JSON.parse(cart[y]);
        listItem.push({
          product_id: item.product.id,
          quantity: item.quantity
        });
      }
        const bill = {
          cart: listItem,
          status: 'true',
          customer_id: this.user.id,
          totalPrice: this.total,
          phone: this.details.phone,
          name: this.user.name,
          email: this.user.email,
          address: this.details.address
        };
        this.cartService.checkOut(bill).subscribe(next => {
          let index: number = -1;
          cart = [];
          localStorage.setItem('cart', JSON.stringify(cart));
          this.loadCart();
          this.cartService.updateTypeOfCart(cart.length);
          alert('Mua hàng thành công');
        });
      }
    );
  }

  update(id: number, value: number) {
    if (value < 1) {
      return;
    }
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
