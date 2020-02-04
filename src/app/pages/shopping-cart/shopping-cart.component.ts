import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';
import {User} from 'src/app/models/user';
import {UserService} from '../../services/user/user.service';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public cart: Product[];


  constructor(private ps: ProductService,
              private us: UserService,
              private cs: CartService) {

  }

  ngOnInit() {
    this.us.currentUserObservable.subscribe((auth) => {
      if (auth) {
        this.cart = this.cs.cart;
      } else {
        this.cart = this.cs.loadFromLocal();
      }
    });
  }
}
