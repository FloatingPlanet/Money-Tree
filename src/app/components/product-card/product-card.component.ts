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

  addToCart(sku: string) {
    console.log(sku);
    var localCart = JSON.parse(localStorage.getItem("anonymousData"));;
    if (localCart != null) {
      localCart['skus'].push(sku);
      localStorage.setItem('anonymousData', JSON.stringify(localCart));
    } else {
      var newProduct = { 'skus': [sku] };
      localStorage.setItem('anonymousData', JSON.stringify(newProduct));
    }
  }
}
