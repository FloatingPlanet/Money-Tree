import {Injectable} from '@angular/core';
import {Product} from '../../models/product';
import {UserService} from '../user/user.service';
import {User} from '../../models/user';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localCart = JSON.parse(localStorage.getItem('anonymousCart'));
  private cart: Product[];
  public cartObservable: Observable<Product[]>;
  private cartSubject: Subject<Product[]>;


  constructor(private us: UserService) {
    this.cartSubject = new Subject<Product[]>();
    this.cartObservable = this.cartSubject.asObservable();
    this.loadCartFromDB();
  }


  loadCartFromDB() {
    this.us.logInObservable.subscribe((auth) => {
      console.log('login status changed');
      if (auth) {
        this.us.userObservable.subscribe((user) => {
          console.log('cart service cart updated ');
          this.cart = (user as User).cart;
          this.cartSubject.next(this.cart);
        });
      }
    });
  }

  addProduct(product: Product) {
    if (this.us.authenticated) {
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

  public getLocalCart(): Product[] {
    return this.localCart ? this.localCart.products : [];
  }

  public getUserCart(): Product[] {
    return this.cart;
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
