import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemService} from '../../../item/item.service';

@Component({
  selector: 'app-item-images-single',
  templateUrl: './item-images-single.component.html',
  styleUrls: ['./item-images-single.component.css']
})
export class ItemImagesSingleComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() index: number;

  @Output() urlEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private itemServ: ItemService) { }

  ngOnInit(): void {
  }
  onHoverImage() {
    this.urlEvent.next(this.imgUrl);
  }

  onLeaveImage() {
    this.urlEvent.next(this.itemServ.getItemsById(this.index).imagePath);
  }
}
