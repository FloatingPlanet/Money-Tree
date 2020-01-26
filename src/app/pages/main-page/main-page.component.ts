import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(private ps: ProductService
  ) {
  }
  ngOnInit() {
  }

}
