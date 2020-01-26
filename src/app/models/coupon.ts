export class Coupon {
  coupon: string; // coupon code
  discount: number; // discount
  from: Date;
  to: Date; // discount starts and end date
  amount: number; // how many coupons are valid
  freeShipping: boolean; // if the coupon is a free shipping coupon
  minimumSpend: number; // valid from total amount CAD
  addedAt: Date; // the coupon is added at which date

}

