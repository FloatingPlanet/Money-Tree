import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor() { }
  order = [
    { name: "Product A", titles: { title: "title A", subTitle: "subTitle A" }, price: 200, picture: { uri: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=400&hei=400&fmt=jpeg&qlt=95&op_usm=0.5,1.5&fit=constrain&.v=1572825197207', thumbNail: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=400&hei=400&fmt=jpeg&qlt=95&op_usm=0.5,1.5&fit=constrain&.v=1572825197207' } },
    { name: "Product B", titles: { title: "title B", subTitle: "subTitle B" }, price: 110, picture: { uri: 'https://dummyimage.com/300x300/000/fff', thumbNail: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=400&hei=400&fmt=jpeg&qlt=95&op_usm=0.5,1.5&fit=constrain&.v=1572825197207' } },
    { name: "Product C", titles: { title: "title C", subTitle: "subTitle C" }, price: 120, picture: { uri: 'https://dummyimage.com/300x400/000/fff', thumbNail: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=400&hei=400&fmt=jpeg&qlt=95&op_usm=0.5,1.5&fit=constrain&.v=1572825197207' } },
    { name: "Product D", titles: { title: "title D", subTitle: "subTitle D" }, price: 130, picture: { uri: 'https://dummyimage.com/600x500/000/fff', thumbNail: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=400&hei=400&fmt=jpeg&qlt=95&op_usm=0.5,1.5&fit=constrain&.v=1572825197207' } }

  ];
  // rate
  public taxRate: number = 0.12;
  public recycleRate: number = 0;
  // amount
  public subtotal: number;
  public shipping: number = 0;
  public estimatedTax: number = 0;
  public recyclingFee: number = 0;
  public total: number;

  ngOnInit() {
    this.subtotal = this.order.reduceRight((p, { price }) => p + price, 0);
    this.estimatedTax = this.taxRate * (this.subtotal + this.shipping);
    this.recyclingFee = this.subtotal * this.recycleRate;
    this.total = Math.ceil((this.subtotal + this.shipping + this.estimatedTax + this.recyclingFee) * 10) / 10;
  }

}
