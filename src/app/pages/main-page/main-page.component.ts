import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart/cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public user: User;
  private userObservable$: Subscription;

  constructor(public ps: ProductService,
              private us: UserService,
              private cs: CartService,
  ) {
  }

  ngOnInit() {
    this.userObservable$ = this.us.userOberservalbe.subscribe((user: User) => {
      this.user = user as User;
    });
  }


  addToCart(product: Product) {
    this.cs.addProduct(product);
  }

  ngOnDestroy(): void {
    this.userObservable$.unsubscribe();
  }
}
