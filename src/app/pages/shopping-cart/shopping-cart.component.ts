import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public orders: Product[];

  constructor(private ps: ProductService) {
    this.orders = JSON.parse(localStorage.getItem('anonymousCart')).products;
    console.log(this.orders);
  }

  ngOnInit() {
  }

}
