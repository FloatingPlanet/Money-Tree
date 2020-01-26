import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Product} from '../../models/product';
import {AuthService} from '../../services/login/auth.service';
import {error} from 'util';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(private ps: ProductService, private us: UserService, private as: AuthService) {
  }

  private user: User;
  private productToBeAdded: Product;

  ngOnInit() {
    this.us.getCurrentUser().then((user) => {
      this.user = user as User;
    }).catch((e) => {
      console.error(e);
    });
  }

  addToCart(product: Product) {
    if (this.as.authenticated) {
      this.us.addProduct(product).then((res) => {
        console.log('added!!!');
      }).catch((e) => {
        console.error(e);
      });
    } else {
      const localCart = JSON.parse(localStorage.getItem('anonymousCart'));
      console.log('add to local')
      if (localCart != null) {
        localCart.products.push(product);
        localStorage.setItem('anonymousCart', JSON.stringify(localCart));
      } else {
        const newProduct = {products: [product]};
        localStorage.setItem('anonymousCart', JSON.stringify(newProduct));
      }
    }
  }
}
