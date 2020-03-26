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

  public increment() {
    this.loading = true;
    setTimeout(() => {
      this.us.changeAmount(this.item.item.SKU, 1).then(() => {
        this.loading = false;
      });
    }, 1000);
  }

  public decrement() {
    this.loading = true;
    setTimeout(() => {
      if (this.item.count === 1) {
        this.us.deleteItemFromCart(this.item.item.SKU).then(() => {
          this.loading = false;
        });
      } else {
        this.us.changeAmount(this.item.item.SKU, -1).then(() => {
          this.loading = false;
        });
      }
    }, 1000);
  }

  public hotUpdate() {
    this.loading = true;
    setTimeout(() => {
      if (this.newAmount === 0) {
        this.us.deleteItemFromCart(this.item.item.SKU).then(() => {
          this.loading = false;
        }).catch((error) => {
          console.error(error);
        });
      } else {
        this.us.changeAmount(this.item.item.SKU, this.newAmount, true).then(() => {
          this.loading = false;
        }).catch((error) => {
          console.error(error);
        });
      }
    }, 1000);
    console.log(this.newAmount);
  }
}
