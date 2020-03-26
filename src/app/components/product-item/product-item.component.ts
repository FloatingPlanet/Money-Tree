import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/models/product';
import {CartService} from '../../services/cart/cart.service';
import {CartItem} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  constructor(private cs: CartService, private us: UserService) {
  }

  @Input() item: CartItem;
  public newAmount: number;
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
    this.us.changeAmount(this.item.item.SKU, 1).then(() => {
    });
  }

  public decrement(amount: number) {
    this.us.changeAmount(this.item.item.SKU, -1).then(() => {
    });
  }
}
