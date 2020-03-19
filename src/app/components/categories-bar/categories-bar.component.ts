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

  constructor(private cs: CategoryService, public route: ActivatedRoute) {
    this.cs.categoriesObservable.subscribe((cats) => {
      this.allCategories = cats;
    });
    // iterate through each children's params
    this.route.children.forEach((r) => {
      // iterate through each children's params
      r.children.forEach((c) => {
        // now we are in grand children's route
        c.params.subscribe((res) => {
          this.currentCat = res.section;
        });
      });
    });
  }

  ngOnInit() {
  }

  public getProducts(category: string) {
    this.cs.specificCategoryProductsObservable(category.toUpperCase()).subscribe((res: Product[]) => {
      // console.log(res);
    });
  }

  public setCurrentCat(category: string) {
    this.currentCat = category;
    console.log(this.currentCat);
  }
}
