import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-products-page',
  templateUrl: './category-products-content.component.html',
  styleUrls: ['./category-products-content.component.scss']
})
export class CategoryProductsContentComponent implements OnInit {
  public path: string;

  constructor() { }

  ngOnInit() {
    this.path = 'category';
  }

}
