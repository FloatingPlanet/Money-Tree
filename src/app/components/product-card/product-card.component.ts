import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from 'src/app/models/product';
import {AuthService} from '../../services/login/auth.service';
import {CartService} from '../../services/cart/cart.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  like = false;
  private user: User;
  @Input() product: Product;
  @Output() productToBeAdded = new EventEmitter<Product>();

  constructor(private as: AuthService) {

  }

  ngOnInit() {
  }

  public addToCart(product: Product) {
    this.productToBeAdded.emit(product);
  }


}
