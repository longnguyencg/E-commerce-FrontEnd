import {Component, OnInit} from '@angular/core';
import {ItemService} from '../home/item/item.service';
import {Items} from '../home/item/item.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
