import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ItemService} from '../../home/item/item.service';
import {CategoryService} from '../../home/category.service';
import {ICategory} from '../../home/icategory';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  addForm;
  cates: ICategory[] = [];

  constructor(private fb: FormBuilder, private router: Router, private itemService: ItemService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(next => {
      this.cates = next;
    });
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required]],
      categories: this.fb.array([])
    });
  }

  add(data) {
    if (data.name && data.price && data.categories) {
      const product = {
        name: data.name,
        price: data.price,
        categories: data.categories
      };
      this.itemService.addItem(product).subscribe(next => {
        this.itemService.getItems().subscribe(next1 => {
            const products = [];
            for (const product1 of next1) {
              products.push(product1[0]);
            }
            this.itemService.updateItems(products);
          }
        );
        this.router.navigate(['home/admin']);
      });
    } else {
      alert('Fail to add new product');
    }
  }

  get name() {
    return this.addForm.get('name');
  }

  get price() {
    return this.addForm.get('price');
  }
  cancel() {
    this.router.navigate(['home/admin']);
  }
  onCheckChange(event) {
    const formArray: FormArray = this.addForm.get('categories') as FormArray;
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      // find the unselected element
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
