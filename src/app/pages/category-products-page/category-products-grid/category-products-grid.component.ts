import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category/category.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../models/product';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-products-grid',
  templateUrl: './category-products-grid.component.html',
  styleUrls: ['./category-products-grid.component.scss']
})
export class CategoryProductsGridComponent implements OnInit, OnDestroy {
  public allProducts: Product[];

  public specificCategoryProductsObservable$: Subscription;

  constructor(private cs: CategoryService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      // keep eye on route changes, if so re-render products
      const cat = params.section;
      console.log(cat);
      this.specificCategoryProductsObservable$ = this.cs.specificCategoryProductsObservable(cat)
        .subscribe((res: Product[]) => {
          // re-load products
          this.allProducts = res;
        });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.specificCategoryProductsObservable$.unsubscribe();
  }
}
