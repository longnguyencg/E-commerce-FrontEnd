import {Component, Input, OnInit} from '@angular/core';
import {Items} from '../item/item.model';
import {ItemService} from '../item/item.service';
import {ActivatedRoute, Params, Route} from '@angular/router';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  id: number;
  inItems: Items;
  items: Items[];
  today: number = Date.now();
  cmtForm;
  user;
  rateForm;
  reviews;

  constructor(private activeRoute: ActivatedRoute, private itemServ: ItemService,
              private fb: FormBuilder, private usersService: UserService) {
  }

  ngOnInit(): void {
    this.usersService.cast.subscribe(user => this.user = user);
    this.itemServ.cast.subscribe(items => {
      this.items = items;
      this.activeRoute.params.subscribe(
        (params: Params) => {
          this.id = parseFloat(params.id);
          this.itemServ.getReview(this.id).subscribe(review => {
            this.reviews = review;
          })
          this.inItems = this.itemServ.getItemsById(this.id);
          this.cmtForm = this.fb.group({
            content: ['', [Validators.required]]
          });
          this.rateForm = this.fb.group({
            amount: ['', [Validators.required]]
          });
        }
      );
    });
  }

  onSubmitRate(data) {
    const newRate = {
      user_id: this.user.id,
      product_id: this.inItems.id,
      amount: data.amount
    }
    this.itemServ.addRating(data);
  }
  getAllComment() {
  }

  onSubmitReview(data) {
    const newCmt = {
      user_id: parseFloat(this.user.id),
      product_id: this.inItems.id,
      content: data.content
    };
    this.itemServ.addReview(newCmt);
    this.reviews = [];
    this.itemServ.getReview(this.id).subscribe(review => {
      this.reviews = review;
    });
  }
}
