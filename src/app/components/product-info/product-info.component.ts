import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public product: Product;
  private readonly SKU: any;

  constructor(private ps: ProductService, private route: ActivatedRoute) {
    this.SKU = this.route.snapshot.paramMap.get('SKU');
    console.log(this.SKU);
    this.ps.fetchProduct(this.SKU).then((res) => {
      this.product = res as Product;
    });
  }

  ngOnInit() {

  }

}
