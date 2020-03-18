import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category/category.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../models/product';
import {Subscription} from 'rxjs';
import * as functions from 'firebase-functions';

@Component({
  selector: 'app-category-products-grid',
  templateUrl: './category-products-grid.component.html',
  styleUrls: ['./category-products-grid.component.scss']
})

export class CategoryProductsGridComponent implements OnInit, OnDestroy {
  public allProducts: Product[] = [];

  public specificCategoryProductsObservable$: Subscription;

  constructor(private cs: CategoryService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      // keep eyes on route changes, if so re-render products
      const cat = params.section;
      this.cs.getProductsWithCategory(cat).then((res) => {
        this.allProducts = this.cs.chosenCategoryProducts;
      });
      // re-load products
    });
  }

  ngOnInit() {
  }

  public load() {
    this.cs.loadAnotherProducts();
  }

  ngOnDestroy(): void {
  }
}
