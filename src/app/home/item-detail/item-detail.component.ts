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
  rate = 0;
  countRate = 0;
  voteByUser;

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
          });
          this.itemServ.getRating(this.id).subscribe(data => {
            this.rate = data[0].voteRate;
            this.countRate = data[0].count;
          });
          this.inItems = this.itemServ.getItemsById(this.id);
          this.cmtForm = this.fb.group({
            content: ['', [Validators.required]]
          });
          this.rateForm = this.fb.group({
            amount: ['', [Validators.required]]
          });
          this.itemServ.getVoteByUser(this.user.id, this.id).subscribe(vote => {
            this.voteByUser = vote;
          });
        }
      );
    });
  }

  onSubmitRate(data) {
    if (!this.voteByUser && data.amount) {
      const newRate = {
        user_id: this.user.id,
        product_id: this.inItems.id,
        amount: data.amount
      };
      this.itemServ.addRating(newRate).subscribe(next => {
        this.itemServ.getRating(this.id).subscribe(data1 => {
          this.rate = 0;
          this.countRate = 0;
          this.rate = data1[0].voteRate;
          this.countRate = data1[0].count;
          this.itemServ.getVoteByUser(this.user.id, this.id).subscribe(vote => {
            this.voteByUser = vote;
          });
        });
      });
    } else {
      const newVote = {
        id: this.voteByUser.id,
        amount: data.amount
      };
      this.itemServ.reVote(newVote).subscribe(next => {
        this.itemServ.getRating(this.id).subscribe(data1 => {
          this.rate = 0;
          this.countRate = 0;
          this.rate = data1[0].voteRate;
          this.countRate = data1[0].count;
          this.itemServ.getVoteByUser(this.user.id, this.id).subscribe(vote => {
            this.voteByUser = vote;
          });
        });
        alert('Revote successfully');
      });
    }
  }
  onSubmitReview(data) {
    const newCmt = {
      user_id: parseFloat(this.user.id),
      product_id: this.inItems.id,
      content: data.content
    };
    this.itemServ.addReview(newCmt).subscribe(next => {
      this.itemServ.getReview(this.id).subscribe(review => {
        this.reviews = [];
        this.reviews = review;
      });
    });
  }

  deleteCmt(id) {
    if (confirm('Are you sure want delete this comment?')) {
       this.itemServ.deleteCmt(id).subscribe( next => {
         alert('Deleted');
         this.itemServ.getReview(this.id).subscribe(review => {
           this.reviews = [];
           this.reviews = review;
         });
       });
    }
  }
}
