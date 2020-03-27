import {AfterViewChecked, Component, OnDestroy, ViewChild} from '@angular/core';
import {CheckoutFormComponent} from './checkout-form/checkout-form.component';
import {OrderSummaryComponent} from '../../components/order-summary/order-summary.component';
import {UserService} from '../../services/user/user.service';
import {CartItem, User} from '../../models/user';
import {CartService} from '../../services/cart/cart.service';
import {FormGroup} from '@angular/forms';
import {OrderService} from '../../services/order/order.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements AfterViewChecked, OnDestroy {
  @ViewChild(CheckoutFormComponent, {static: false}) checkoutComponent: CheckoutFormComponent;
  @ViewChild(OrderSummaryComponent, {static: false}) orderSummaryComponent: OrderSummaryComponent;
  public orders: CartItem[];
  public saFormGroup: FormGroup;
  public baFormGroup: FormGroup;
  public ccFormGroup: FormGroup;
  private logInObservable$: Subscription;
  private userObservable$: Subscription;

  constructor(private us: UserService, private cs: CartService, private os: OrderService) {

    this.userObservable$ = this.us.userObservable.subscribe((user) => {
      if (user.guest) {
        this.orders = this.cs.getLocalCart();

      } else {
        // TODO Grab shopping cart info AKA sub-collection
        this.orders = user.cart;
      }
    });

  }

  ngAfterViewChecked() {
    this.baFormGroup = this.checkoutComponent.baFormGroup;
    this.saFormGroup = this.checkoutComponent.saFormGroup;
    this.ccFormGroup = this.checkoutComponent.ccFormGroup;
  }

  public submitOrder() {
    const order = {
      uid: 'a123',
      orderNumber: 'O' + Date.now().toString(),
      orderStatus: 'N/A',
      shippingInfo: this.saFormGroup.value,
      trackingNumber: 'N/A',
      billingInfo: this.baFormGroup.value,

      products: this.orders.map(cartItem => cartItem.item.SKU),
      coupon: this.orderSummaryComponent.validatedCoupon ? this.orderSummaryComponent.validatedCoupon : null,
      totalPrice: this.orderSummaryComponent.total,
      purchaseDate: new Date(),
    };
    console.log(order);
    this.os.addOrder(order).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.logInObservable$) {
      this.logInObservable$.unsubscribe();
    }
    if (this.userObservable$) {
      this.userObservable$.unsubscribe();
    }
  }
}
