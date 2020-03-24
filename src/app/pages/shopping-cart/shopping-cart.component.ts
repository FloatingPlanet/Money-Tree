import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {UserService} from '../../services/user/user.service';
import {CartService} from '../../services/cart/cart.service';
import {CartItem, User} from '../../models/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public cart: CartItem[] = [];
  private logInObservable$: Subscription;
  private userObservable$: Subscription;

  constructor(private ps: ProductService,
              private us: UserService,
              private cs: CartService) {

  }

  ngOnInit() {
    this.logInObservable$ = this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.userObservable$ = this.us.userObservable.subscribe((user: User) => {
          if (user) {
            this.us.userCartItems().then((items) => {
              this.cart = items;
            });
          }
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
