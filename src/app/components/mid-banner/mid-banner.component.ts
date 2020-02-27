import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mid-banner',
  templateUrl: './mid-banner.component.html',
  styleUrls: ['./mid-banner.component.scss']
})
export class MidBannerComponent implements OnInit {
  @Input() path: string;
  public img: string;

  constructor() {
  }

  ngOnInit() {
    switch (this.path) {
      case 'category': {
        this.img = '../../../assets/category.jpg';
        break;
      }
      default:
        this.img = '../../../assets/hugebanner.jpg';
    }
  }

}
