import {Component, Input, OnChanges} from '@angular/core';
import {Product} from 'src/app/models/product';
import {ProductService} from 'src/app/services/product/product.service';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons/coupons.service';
import {Router} from 'node_modules/@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnChanges {
  @Input() orders: Product[];
  public getCoupon: string;
  public currentDate = new Date();
  // rate
  public taxRate = 0.12;
  public recycleRate = 0;
  // amount
  public subtotal: number;
  public shipping = 0;
  public estimatedTax = 0;
  public recyclingFee = 0;
  public total: number;
  public couponInput: string;
  public  coupon: Coupon;
  public totalItems: number;
  public validatedCoupon: Coupon;
  constructor( private cs: CouponsService, public router: Router
  ) {
  }

  ngOnChanges() {
    this.calculateSummary(this.coupon);
  }

  private calculateSummary(coupon: Coupon) {
    if (this.orders) {
      this.totalItems = this.orders.length;
      this.subtotal = coupon ? Math.ceil(this.subtotal * (1 - this.coupon.discount) * 10) / 10 :
        this.orders.map(product => product.productPrice).reduceRight((prev, next) => prev + next, 0);
      this.estimatedTax = this.taxRate * (this.subtotal + this.shipping);
      this.recyclingFee = this.subtotal * this.recycleRate;
      this.total = Math.ceil((this.subtotal + this.shipping + this.estimatedTax + this.recyclingFee) * 10) / 10;
    }
  }


  validateCoupon() {
    this.cs.validateCoupon(this.couponInput).then((result) => {
      this.coupon = result as Coupon;
      if ((this.subtotal >= this.coupon.minimumSpend)
        && (this.currentDate >= new Date(this.coupon.from))
        && (this.currentDate <= new Date(this.coupon.to))
        && (this.coupon.amount > 0)) {
        this.calculateSummary(this.coupon);
        this.getCoupon = `${this.coupon.coupon} is applied`;
        this.validatedCoupon = this.coupon;
      } else {
        if (this.subtotal < this.coupon.minimumSpend) {
          this.getCoupon = `You need to spend more than ${this.coupon.minimumSpend} to use coupon`;
        } else if (this.currentDate < new Date(this.coupon.from)) {
          this.getCoupon = `The coupon is valid from ${this.coupon.from}`;
        } else if (this.currentDate > new Date(this.coupon.to)) {
          this.getCoupon = `Oops! The coupon has expired.`;
        } else if (this.coupon.amount <= 0) {
          this.getCoupon = `You are not eligible to use this coupon.`;
        }
      }
      console.log(result);
    }).catch((error) => {
      this.getCoupon = 'Coupon is not valid';
      console.error(error);
    });
  }

}
