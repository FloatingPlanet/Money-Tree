import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';
import {UserService} from '../../services/user/user.service';
import {CartService} from '../../services/cart/cart.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public cart: Product[];
  private dummy: Product[];

  constructor(private ps: ProductService,
              private us: UserService,
              private cs: CartService) {

  }

  ngOnInit() {
    this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.us.userOberservalbe.subscribe((res: User) => {
          console.log('shopping cart updated');
          this.cart = res.cart ? res.cart : [];
        });
      } else {
        this.cart = this.cs.getLocalCart();
      }
    });
  }
}
