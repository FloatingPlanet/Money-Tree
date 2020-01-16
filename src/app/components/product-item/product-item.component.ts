import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  constructor() {
  }

  @Input() product: Product;

  ngOnInit() {
  }

  deleteFromCart(SKU: string) {
    const localCart = JSON.parse(localStorage.getItem('anonymousCart'));
    const products = localCart.products;
    let newProducts = products.filter(x => {
      return x.SKU !== SKU;
    });
    newProducts = {
      products: newProducts
    };
    localStorage.setItem('anonymousCart', JSON.stringify(newProducts));
    window.location.reload();
  }
}
