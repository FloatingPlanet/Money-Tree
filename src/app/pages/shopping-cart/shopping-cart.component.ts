import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';
import {User} from 'src/app/models/user';
import {AuthService} from '../../services/login/auth.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public orders: { info: Product[]; quantity: number };


  constructor(private ps: ProductService, private as: AuthService, private us: UserService) {

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
        this.loadFromLocal();
      }
    });

  }

  private loadFromLocal() {
    const localCart = JSON.parse(localStorage.getItem('anonymousCart'));
    this.orders = localCart ? localCart.products : [];
  }


}
