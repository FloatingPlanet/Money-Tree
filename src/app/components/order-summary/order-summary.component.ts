import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'src/app/models/product';
import {ProductService} from 'src/app/services/product/product.service';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons/coupons.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input() orders: Product[];

  // rate
  public taxRate = 0.12;
  public recycleRate = 0;
  // amount
  public subtotal: number;
  public shipping = 0;
  public estimatedTax = 0;
  public recyclingFee = 0;
  public total: number;
  public myInput: string;
  private coupon: Coupon;
  public totalItems: number;

  constructor(private ps: ProductService, private cs: CouponsService) {

  }

  ngOnInit() {
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
    this.cs.valiateCoupon(this.myInput).then((result) => {
      this.coupon = result as Coupon;
      this.calculateSummary(this.coupon);
      console.log(result);
    }).catch((error) => {
      console.error(error);
    });
  }

}
