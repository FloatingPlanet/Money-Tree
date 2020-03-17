import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../models/category';
import {Product} from '../../models/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories-bar',
  templateUrl: './categories-bar.component.html',
  styleUrls: ['./categories-bar.component.scss']
})
export class CategoriesBarComponent implements OnInit {
  public allCategories: Category[];
  public cat: Category;
  public currentCat: string;

  constructor(private cs: CategoryService,  public route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      // keep eye on route changes, if so re-render products
      const cat = params.section;
      console.log('this is ' + cat);
      console.log('this is ' + this.currentCat);
    });

    this.cs.categoriesObservable.subscribe((cats) => {
      this.allCategories = cats;
    });
  }

  ngOnInit() {
  }

  public getProducts(category: string) {
    this.cs.specificCategoryProductsObservable(category.toUpperCase()).subscribe((res: Product[]) => {
      console.log(res);
    });
  }
}
