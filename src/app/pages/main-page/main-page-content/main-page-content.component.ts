import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {UserService} from '../../../services/user/user.service';
import {Product} from '../../../models/product';
import {CartService} from '../../../services/cart/cart.service';

@Component({
  selector: 'app-main-page-content',
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss']
})
export class MainPageContentComponent implements OnInit {
  public products: Product[] = [];
  public path: string;

  constructor(public ps: ProductService,
              private us: UserService,
              private cs: CartService, ) {
  }

  ngOnInit(): void {
    this.products = this.ps.allProducts;
  }

  addToCart(product: Product) {
    this.cs.addProduct(product);
  }

  load() {
    this.ps.loadAnotherDocs();
  }
}
