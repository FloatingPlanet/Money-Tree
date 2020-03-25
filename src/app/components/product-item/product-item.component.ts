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
  public newAmount: any;
  private loading = false;

  ngOnInit() {
  }

  public deleteFromCart(SKU: string) {
    this.loading = true;
    this.cs.deleteFromCart(SKU).then(() => {
      this.loading = false;
    }).catch((error) => {
      this.loading = false;
      console.error(error);
    });
  }

  public increment(amount: number) {
    console.log('lol');
  }

  public decrement(amount: number) {

  }
}
