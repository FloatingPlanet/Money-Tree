import {Product} from './product';
import {AddressInfo} from './addressInfo';
import {Coupon} from './coupon';

export class Order {
  uid: string;
  orderNumber: string;
  orderStatus: string;
  // from checkout-form
    // Tracking Related:
  shippingInfo: AddressInfo;
  trackingNumber: string;
    // Billing related:
  billingInfo: AddressInfo;
  // from oder-summary form
  products: string[];
  coupon?: Coupon;
  totalPrice: number;
  purchaseDate: Date;
}
