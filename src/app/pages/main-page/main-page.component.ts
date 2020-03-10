import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {UserService} from '../../services/user/user.service';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public path: string;

  constructor(public ps: ProductService,
              private us: UserService,
              private cs: CartService,
  ) {
  }

  ngOnInit() {
    this.products = this.ps.allProducts;
    // this.ps.productObservable.subscribe((prods: Product[]) => {
    //   this.products = prods;
    // });
  }


  addToCart(product: Product) {
    this.cs.addProduct(product);
  }

  load() {
    this.ps.loadAnotherDocs();
  }

  ngOnDestroy(): void {

  }
}

