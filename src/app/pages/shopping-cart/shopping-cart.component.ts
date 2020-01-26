import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';
import {AuthService} from '../../services/login/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public orders: Product[];

  constructor(private ps: ProductService, private as: AuthService, private us: UserService) {

  }
  ngOnInit() {
    if (this.as.authenticated) {
      this.orders = [];
    } else {
      this.loadFromLocal();
    }
  }

  private loadFromLocal() {
    const localCart = JSON.parse(localStorage.getItem('anonymousCart'));
    this.orders = localCart ? localCart.products : [];
  }



}
