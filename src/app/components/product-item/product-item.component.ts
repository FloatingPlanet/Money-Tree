import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  constructor() { }
  products = [
    { name: "Product A", titles: { title: "title A", subTitle: "subTitle A", price: "CAD 100" }, picture: { uri: 'https://dummyimage.com/600x150/000/fff', thumbNail: 'https://dummyimage.com/600x150/000/fff' } },
    { name: "Product B", titles: { title: "title B", subTitle: "subTitle B", price: "CAD 110" }, picture: { uri: 'https://dummyimage.com/300x300/000/fff', thumbNail: 'https://dummyimage.com/600x150/000/fff' } },
    { name: "Product C", titles: { title: "title C", subTitle: "subTitle C", price: "CAD 120" }, picture: { uri: 'https://dummyimage.com/300x400/000/fff', thumbNail: 'https://dummyimage.com/600x150/000/fff' } },
    { name: "Product D", titles: { title: "title D", subTitle: "subTitle D", price: "CAD 130" }, picture: { uri: 'https://dummyimage.com/600x500/000/fff', thumbNail: 'https://dummyimage.com/600x150/000/fff' } }]
  ngOnInit() {
  }

}
