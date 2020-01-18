import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  like = false;
  @Input() product: Product;

  constructor() {
  }

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
