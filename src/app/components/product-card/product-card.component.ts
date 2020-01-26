import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {AuthService} from '../../services/login/auth.service';
import {CartService} from '../../services/cart/cart.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  like = false;
  private user: User;
  @Input() product: Product;

  constructor(private as: AuthService, private cs: CartService, private us: UserService) {

  }


  ngOnInit() {
    this.us.getCurrentUser().then((user) => {
      this.user = user as User;
    }).catch((error) => {
      console.error(error);
    });
  }

  addToCart(product: Product[]) {
    if (this.as.authenticated) {
      this.us.addProduct(product);
    }

    const localCart = JSON.parse(localStorage.getItem('anonymousCart'));
    if (localCart != null) {
      localCart.products.push(product);
      localStorage.setItem('anonymousCart', JSON.stringify(localCart));
    } else {
      const newProduct = {products: [product]};
      localStorage.setItem('anonymousCart', JSON.stringify(newProduct));
    }
  }


}
