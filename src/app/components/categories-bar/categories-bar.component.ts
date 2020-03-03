import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../models/category';
import {Product} from '../../models/product';

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
    });
  }

  ngOnInit() {
  }

  public getProducts(category: string) {
    this.cs.specificCategoryProductsObservable(category.toUpperCase()).subscribe((res: Product[])=>{
      console.log(res);
    });
  }
}
