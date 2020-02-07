import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart/cart.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public products: Product[] = [];
  private user: User;

  constructor(public ps: ProductService,
              private us: UserService,
              private cs: CartService,
  ) {
  }

  ngOnInit() {
    this.us.getCurrentUser().then((user) => {
      this.user = user as User;
    }).catch((e) => {
      console.error(e);
    });
  }


  addToCart(product: Product) {
    this.cs.addProduct(product);
  }


}
