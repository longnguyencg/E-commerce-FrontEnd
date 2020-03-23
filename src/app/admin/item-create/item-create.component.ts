import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ItemService} from '../../home/item/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  addForm;

  constructor(private fb: FormBuilder, private router: Router, private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    });
  }

  add(data) {
    const product = {
      name: data.name,
      price: data.price,
      category_id: data.category_id
    };
    this.itemService.addItem(product).subscribe(next => {
      this.itemService.getItems().subscribe(next1 => {
          this.itemService.updateItems(next1);
        }
      );
      this.router.navigate(['home/admin']);
    });
  }
  get name() {
    return this.addForm.get('name');
  }

  get price() {
    return this.addForm.get('price');
  }

  get category() {
    return this.addForm.get('category_id');
  }
}
