import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Validator, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private product;
  private products;
  constructor(private ps: ProductService
  ) { }

  ngOnInit() {
    this.product = {
      SKU: '19930312',
      productId: 123123,
      productName: 'shoes',
      productCategory: ['bottom'],
      productPrice: 230,
      productDescription: 'my shoes',
      productImageUrls: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=400&hei=400&fmt=jpeg&qlt=95&op_usm=0.5,1.5&fit=constrain&.v=1572825197207'],
      productAddedAt: new Date(),
      productQuantity: 12,
      ratings: 4,
      favourite: false,
      productSeller: 'me',
    };
    this.ps.addProduct(this.product);
  }

}
