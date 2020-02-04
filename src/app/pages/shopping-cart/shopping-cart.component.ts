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


  constructor(private ps: ProductService,
              private us: UserService,
              private cs: CartService) {

  }

  ngOnInit() {
    if (this.us.authenticated) {
      this.us.userOberservalbe.subscribe((res) => {
        this.cart = (res as User).cart;
      });
    } else {
      this.cart = this.cs.loadFromLocal();
    }
  }
}
