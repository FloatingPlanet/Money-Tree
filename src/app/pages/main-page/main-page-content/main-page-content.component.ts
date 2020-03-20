import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss']
})
export class MainPageContentComponent implements OnInit {
  public products: Product[] = [];
  public path: string;

  constructor(public ps: ProductService) {
  }

  ngOnInit(): void {
    this.products = this.ps.allProducts;
  }

  load() {
    this.ps.loadAnotherProducts();
  }
}
