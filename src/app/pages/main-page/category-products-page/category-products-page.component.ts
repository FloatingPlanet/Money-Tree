import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-products-page',
  templateUrl: './category-products-page.component.html',
  styleUrls: ['./category-products-page.component.scss']
})
export class CategoryProductsPageComponent implements OnInit {
  public path: string;

  constructor() { }

  ngOnInit() {
    this.path = 'category';
  }

}
