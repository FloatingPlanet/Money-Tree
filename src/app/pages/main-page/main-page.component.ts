import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart/cart.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as cartActions from '../../actions/products.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public products: Product[] = [];
  private user: User;
  cart$: Observable<Product[]>;

  constructor(private ps: ProductService,
              private us: UserService,
              private cs: CartService,
              private store: Store<User>
  ) {
    this.cart$ = this.store.select('cart');
  }

  ngOnInit() {
    this.us.getCurrentUser().then((user) => {
      this.user = user as User;
    }).catch((e) => {
      console.error(e);
    });
    this.getCart();
  }

  getCart() {
    this.store.dispatch(new cartActions.GetCart());
    // this.cart$.subscribe((res) => {
    //   console.log(res);
    // });
  }

  addToCart(product: Product) {
    this.cs.addProduct(product);
  }
}
