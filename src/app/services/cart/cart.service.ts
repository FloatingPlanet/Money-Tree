import {Injectable} from '@angular/core';
import {Product} from '../../models/product';
import {AuthService} from '../login/auth.service';
import {UserService} from '../user/user.service';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localCart = JSON.parse(localStorage.getItem('anonymousCart'));
  public cart: Product[];

  constructor(private as: AuthService, private us: UserService) {
    this.as.currentUserObservable.subscribe((user) => {
      this.cart = (user as User).cart;
    });
  }

  addProduct(product: Product) {
    if (this.as.authenticated) {
      this.us.addProduct(product).then((res) => {
      }).catch((e) => {
        console.error(e);
      });
    } else {
      if (this.localCart != null) {
        this.localCart.products.push(product);
        localStorage.setItem('anonymousCart', JSON.stringify(this.localCart));
      } else {
        const newProduct = {products: [product]};
        localStorage.setItem('anonymousCart', JSON.stringify(newProduct));
      }
    }
    return;
  }

  public loadFromLocal(): Product[] {
    return this.localCart ? this.localCart.products : [];
  }

  public deleteFromCart(SKU: string) {
    const products = this.localCart.products;
    let newProducts = products.filter(x => {
      return x.SKU !== SKU;
    });
    newProducts = {
      products: newProducts
    };
    localStorage.setItem('anonymousCart', JSON.stringify(newProducts));
    window.location.reload();
  }

  clearAll() {
    const emptyProduct = {
      products: []
    };
    localStorage.setItem('anonymousCart', JSON.stringify(emptyProduct));
  }

}
