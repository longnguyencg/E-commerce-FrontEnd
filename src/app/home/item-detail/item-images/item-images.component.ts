import {Component, Input, OnInit} from '@angular/core';
import {Items} from '../../item/item.model';

@Component({
  selector: 'app-item-images',
  templateUrl: './item-images.component.html',
  styleUrls: ['./item-images.component.css']
})
export class ItemImagesComponent implements OnInit {
  @Input() items1: Items;
  constructor() { }

  ngOnInit(): void {
  }
  urlChange(newUrl: string) {
    this.items1.imagePath = newUrl;
  }
}
