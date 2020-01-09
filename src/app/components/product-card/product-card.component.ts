import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  like = false;
  constructor() { }
  @Input() product: Product;
  ngOnInit() {
  }

  addToCart(product: Product[]) {
    console.log(product);
    var localCart = JSON.parse(localStorage.getItem("anonymousCart"));;
    if (localCart != null) {
      localCart['products'].push(product);
      localStorage.setItem('anonymousCart', JSON.stringify(localCart));
    } else {
      var newProduct = { 'products': [product] };
      localStorage.setItem('anonymousCart', JSON.stringify(newProduct));
    }
  }
}
