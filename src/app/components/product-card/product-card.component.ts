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
    var tmp = localStorage.getItem("anonymousData");
    if (tmp != null) {
      var ss = JSON.parse(tmp)['skus'].push(sku);
      console.log(JSON.parse(tmp))
      localStorage.setItem('anonymousData', JSON.stringify(ss));
      console.log(localStorage.getItem('anonymousData'))
    } else {
      var newProduct = { 'skus': [sku] };
      localStorage.setItem('anonymousData', JSON.stringify(newProduct));
    }
  }
}
