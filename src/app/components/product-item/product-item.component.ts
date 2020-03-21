import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/models/product';
import {CartService} from '../../services/cart/cart.service';
import {CartItem} from '../../models/user';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  constructor(private cs: CartService) {
  }

  @Input() item: CartItem;

  ngOnInit() {
  }

  public deleteFromCart(SKU: string) {
    this.cs.deleteFromCart(SKU);
  }

}
