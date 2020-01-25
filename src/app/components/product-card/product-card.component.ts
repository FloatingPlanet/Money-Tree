import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/models/product';
import {AuthService} from '../../services/login/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  like = false;

  constructor(private as: AuthService) {
    const user = this.as.currentUser();
    console.log(user);
  }

  @Input() product: Product;

  ngOnInit() {
  }

  addToCart(product: Product[]) {
    console.log(product);
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
