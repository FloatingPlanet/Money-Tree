import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';
import {User} from 'src/app/models/user';
import {AuthService} from '../../services/login/auth.service';
import {UserService} from '../../services/user/user.service';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public orders: Product[];


  constructor(private ps: ProductService,
              private as: AuthService,
              private us: UserService,
              private cs: CartService) {

  }

  ngOnInit() {
    this.as.currentUserObservable.subscribe((auth) => {
      if (auth) {
        this.us.getCurrentUser().then((res) => {
          const user = res as User;
          this.orders = user.cart;
        }).catch((error) => {
          console.error(error);
        });
      } else {
        this.orders = this.cs.loadFromLocal();
      }
    });
  }


}
