import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from 'src/app/models/product';
import {CartService} from '../../services/cart/cart.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  public like = false;
  private user: User;
  @Input() product: Product;
  @Output() productToBeAdded = new EventEmitter<Product>();

  constructor(private us: UserService) {

  }

  ngOnInit() {
  }

  public addToCart(product: Product) {
    this.productToBeAdded.emit(product);
  }


}
