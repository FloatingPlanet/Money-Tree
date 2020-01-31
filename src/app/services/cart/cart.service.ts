import {Injectable} from '@angular/core';
import {Product} from '../../models/product';
import {AuthService} from '../login/auth.service';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localCart = JSON.parse(localStorage.getItem('anonymousCart'));

  constructor(private as: AuthService, private us: UserService) {
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
