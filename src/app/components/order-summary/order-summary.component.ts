import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  // rate
  public taxRate: number = 0.12;
  public recycleRate: number = 0;
  // amount
  public subtotal: number;
  public shipping: number = 0;
  public estimatedTax: number = 0;
  public recyclingFee: number = 0;
  public total: number;
  public orders: Product[];
  constructor(private ps: ProductService) {
    this.orders = JSON.parse(localStorage.getItem('anonymousCart'))['products'];
    console.log(this.orders);
  }


  ngOnInit() {
    this.subtotal = this.orders.map(product => product.productPrice).reduceRight((prev, next) => prev + next, 0);
    this.estimatedTax = this.taxRate * (this.subtotal + this.shipping);
    this.recyclingFee = this.subtotal * this.recycleRate;
    this.total = Math.ceil((this.subtotal + this.shipping + this.estimatedTax + this.recyclingFee) * 10) / 10;
  }

}
