import {Component, HostListener, OnInit} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
// pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos === max) {
      console.log('end');
    }
  }

  constructor(
    private cs: CartService,
  ) {
  }

  ngOnInit() {

    // this.ps.productObservable.subscribe((prods: Product[]) => {
    //   this.products = prods;
    // });
  }


}

