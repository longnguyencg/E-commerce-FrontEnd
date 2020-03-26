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
      const product1 = {
        name: data.name,
        price: data.price,
        categories: data.categories
      };
      this.itemService.addItem(product1).subscribe(next => {
        this.itemService.getItems().subscribe(next1 => {
            const itemss = [];
            for (const product of next1) {
              itemss.push(product[0]);
            }
            for (const item of itemss) {
              item.description = 'haha';
              item.imagePath = 'https://5.imimg.com/data5/EH/IU/MY-13191810/moto-g5-plus-500x500.png';
              item.reviewCounter = 3;
              item.reviews = ['good', 'bad', 'ok'];
              item.ratingCounter = 3;
              item.ratings = [3, 5, 3];
              item.avg = 3.3;
              item.extraImages = [
                'https://fscl01.fonpit.de/userfiles/6727621/image/2017/lenovo-moto-g5/AndroidPIT-lenovo-moto-g5-1120-w810h462.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQs5vZtDVm21sb-dInaZ-7qJXJCqNKzDTc50UO3-G97A6zGNf5k',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREu8RL-q4hMdHZOu9rSRHLxFCVuRT7yvOHJrKlFmrReO0iWqX0',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOU0ZGLS85pB9_-b692rHeuY1siTxlalWlaybOuNJhbZJMlKNQ',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTR1g_Ee8u3W_6o2oBZipC3L6qsDBb5jD9Dde9qMA1BNDXbFzgL'
              ];
            }
            this.itemService.updateItems(itemss);
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
