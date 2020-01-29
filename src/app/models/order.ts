import {Product} from './product';
import {AddressInfo} from './addressInfo';

export class Order {
  uid: string;
  orderNumber: number;
  purchaseDate: Date;
  orderStatus: string;
  // Tracking Related:
  shippingInfo: AddressInfo;
  trackingNumber: string;
  // Billing related:
  billingInfo: AddressInfo;
  products: Product[];
}
