import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/models/product';
import {AuthService} from '../../services/login/auth.service';
import {CategoryService} from '../../services/category/category.service';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  like = false;
  @Input() product: Product;

  constructor(private as: AuthService, private cs: CartService) {

  }


  ngOnInit() {
  }

  addToCart(product: Product[]) {
    if (this.as.authenticated) {
      console.log('log');
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
