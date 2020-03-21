import {Injectable} from '@angular/core';
import {Product} from '../../models/product';
import {UserService} from '../user/user.service';
import {CartItem} from '../../models/user';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  /*
  localCart_ is cart retrieve from localstorage
   */
  private localCart = JSON.parse(localStorage.getItem('anonymousCart'));
  private cart: CartItem[];
  private cart$: Subject<CartItem[]>;


  constructor(private us: UserService) {
    this.cart$ = new Subject<CartItem[]>();
  }

  /*
  add product to in user/guest cart
   */
  addProduct(product: Product) {
    if (this.us.authenticated) {
      this.us.addProductToCart(product).then(() => {
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

  /*
  return guest's cart
   */
  public getLocalCart(): CartItem[] {
    return this.localCart ? this.localCart.products : [];
  }

  public getUserCart(): CartItem[] {
    return this.cart;
  }

  /*
  delete product from cart
   */
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

  /*
  clear localstorage cart
   */
  clearAll() {
    const emptyProduct = {
      products: []
    };
    localStorage.setItem('anonymousCart', JSON.stringify(emptyProduct));
  }
}
