import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CheckoutFormComponent} from '../../components/checkout-form/checkout-form.component';
import {OrderSummaryComponent} from '../../components/order-summary/order-summary.component';
import {Product} from '../../models/product';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/login/auth.service';
import {CartService} from '../../services/cart/cart.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements AfterViewChecked {
  @ViewChild(CheckoutFormComponent, {static: false}) checkoutComponent: CheckoutFormComponent;
  @ViewChild(OrderSummaryComponent, {static: false}) orderSummaryComponent: OrderSummaryComponent;
  public orders: Product[];
  private saFormGroup: FormGroup;
  private baFormGroup: FormGroup;
  private ccFormGroup: FormGroup;

  constructor(private us: UserService, private as: AuthService, private cs: CartService) {
    this.as.currentUserObservable.subscribe((auth) => {
      if (auth) {
        this.us.getCurrentUser().then((res) => {
          const user = res as User;
          this.orders = user.cart;
        }).catch((error) => {
          console.error(error);
        });
      } else {
        this.orders = this.cs.loadFromLocal();
      }
    });
  }

  ngAfterViewChecked() {
    this.baFormGroup = this.checkoutComponent.baFormGroup;
    this.saFormGroup = this.checkoutComponent.saFormGroup;
    this.ccFormGroup = this.checkoutComponent.ccFormGroup;
  }

  private submitOrder() {

  }
}
