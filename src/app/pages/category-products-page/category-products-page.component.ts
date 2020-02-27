import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from '../../models/product';
import {CategoryService} from '../../services/category/category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-products-page',
  templateUrl: './category-products-page.component.html',
  styleUrls: ['./category-products-page.component.scss']
})
export class CategoryProductsPageComponent implements OnInit, OnDestroy {
  public path: string;
  public allProducts: Product[];

  public specificCategoryProductsObservable$: Subscription;

  constructor(private cs: CategoryService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      const cat = params.category;
      this.cs.specificCategoryProductsObservable(cat).subscribe((res: Product[]) => {
        this.allProducts = res;
      });
    });
  }

  ngOnInit() {
    this.path = 'category';
  }

  ngOnDestroy(): void {
    this.specificCategoryProductsObservable$.unsubscribe();
  }
}
