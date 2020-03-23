import {Component, Input, OnInit} from '@angular/core';
import {Items} from '../item/item.model';
import {ItemService} from '../item/item.service';
import {ActivatedRoute, Params, Route} from '@angular/router';
import {NgForm} from '@angular/forms';

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


  constructor(private activeRoute: ActivatedRoute, private itemServ: ItemService) {
  }

  ngOnInit(): void {
    this.itemServ.cast.subscribe(items => {
      this.items = items;
      this.activeRoute.params.subscribe(
        (params: Params) => {
          this.id = parseFloat(params.id);
          this.inItems = this.itemServ.getItemsById(this.id);
        }
      );
    });
  }

  onSubmitRate(form: NgForm) {
    const newrate = parseInt(form.value.rate, 10);
    this.itemServ.addRating(this.id, newrate);
    form.reset();
  }

  onSubmitReview(form: NgForm) {
    const newreview = form.value.review;
    this.itemServ.addReview(this.id, newreview);
    form.reset();
  }
}
