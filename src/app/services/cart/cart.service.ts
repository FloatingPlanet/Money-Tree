import {Injectable} from '@angular/core';
import {Product} from '../../models/product';
import {AuthService} from '../login/auth.service';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private as: AuthService, private us: UserService) {
  }

  addProduct(product: Product) {
    if (this.as.authenticated) {
      this.us.addProduct(product).then((res) => {
        console.log('added!!!');
      }).catch((e) => {
        console.error(e);
      });
    } else {
      const localCart = JSON.parse(localStorage.getItem('anonymousCart'));
      console.log('add to local');
      if (localCart != null) {
        localCart.products.push(product);
        localStorage.setItem('anonymousCart', JSON.stringify(localCart));
      } else {
        const newProduct = {products: [product]};
        localStorage.setItem('anonymousCart', JSON.stringify(newProduct));
      }
    }
    return;
  }

  public loadFromLocal(): Product[] {
    const localCart = JSON.parse(localStorage.getItem('anonymousCart'));
    return localCart ? localCart.products : [];
  }

}
