import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../models/category';

@Component({
  selector: 'app-categories-bar',
  templateUrl: './categories-bar.component.html',
  styleUrls: ['./categories-bar.component.scss']
})
export class CategoriesBarComponent implements OnInit {
  public allCategories: Category[];
  public cat: Category;

  constructor(private cs: CategoryService) {
    this.cs.categoriesObservable.subscribe((cats) => {
      this.allCategories = cats;
      console.log(this.allCategories);
    });
  }

  ngOnInit() {
  }

}
