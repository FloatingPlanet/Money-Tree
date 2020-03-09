import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';
import {UserService} from '../../services/user/user.service';
import {CartService} from '../../services/cart/cart.service';
import {User} from '../../models/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public cart: Product[];
  private logInObservable$: Subscription;
  private userObservable$: Subscription;

  constructor(private ps: ProductService,
              private us: UserService,
              private cs: CartService) {

  }

  ngOnInit() {
    this.logInObservable$ = this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.userObservable$ = this.us.userObservable.subscribe((res: User) => {
          console.log('shopping cart updated');
          this.cart = res.cart ? res.cart : [];
        });
      } else {
        this.cart = this.cs.getLocalCart();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.logInObservable$) {
      this.logInObservable$.unsubscribe();
    }
    if (this.userObservable$) {
      this.userObservable$.unsubscribe();
    }
  }
}
