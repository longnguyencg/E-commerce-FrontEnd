import {Component, OnInit} from '@angular/core';
import {Items} from '../../home/item/item.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ItemService} from '../../home/item/item.service';
import {FormArray, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {CategoryService} from '../../home/category.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  id: number;
  inItems: Items;
  items: Items[] = [];
  editForm;
  cates;

  constructor(private activeRoute: ActivatedRoute,
              private itemServ: ItemService,
              private fb: FormBuilder,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(next => {
      this.cates = next;
      this.activeRoute.params.subscribe(
        (params: Params) => {
          this.id = parseFloat(params.id);
          this.itemServ.cast.subscribe(datas => {
            for ( const data of datas) {
              if (data.id === this.id) {
                this.inItems = data;
              }
            }
            const idCate = [];
            for (const cate of this.cates) {
              for (const category of this.inItems.categories) {
                if (category.id === cate.id) {
                  idCate.push(category.id);
                  cate.check = 1;
                }
              }
            }
            this.editForm = this.fb.group({
              name: [this.inItems.name, [Validators.required, Validators.minLength(4)]],
              price: [this.inItems.price, [Validators.required]],
              categories: this.fb.array(idCate)
            });
          });
        }
      );
    });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.editForm.get('categories') as FormArray;
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      // find the unselected element
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === parseFloat(event.target.value)) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
        }
        i++;
      });
      console.log(formArray.controls);
    }
  }

  update(data) {
    const item1 = {
      name: data.name,
      price: data.price,
      categories: data.categories
    };
    this.itemServ.update(item1, this.id).subscribe(next => {
      this.itemServ.getItems().subscribe(next1 => {
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
        this.itemServ.updateItems(itemss);
        }
      );
      this.router.navigate(['home/admin']);
    });
  }

  get name() {
    return this.editForm.get('name');
  }

  get price() {
    return this.editForm.get('price');
  }

  cancel() {
    this.router.navigate(['home/admin']);
  }
}

