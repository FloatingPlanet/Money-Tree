import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from 'src/app/models/product';
import {User} from '../../models/user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  public like = false;
  public  user: User;
  public buttonShow = false;
  @Input() product: Product;
  @Output() productToBeAdded = new EventEmitter<Product>();

  constructor() {

  }

  ngOnInit() {
  }

  public addToCart(product: Product) {
    this.productToBeAdded.emit(product);
  }
}
