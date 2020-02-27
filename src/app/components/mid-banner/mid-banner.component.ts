import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-mid-banner',
  templateUrl: './mid-banner.component.html',
  styleUrls: ['./mid-banner.component.scss']
})
export class MidBannerComponent implements OnChanges {
  @Input() path: string;
  public img: string;

  constructor() {
  }

  ngOnChanges() {
    switch (this.path) {
      case 'category': {
        this.img = '../../../assets/category.jpg';
        break;
      }
      default:
        this.img = '../../../assets/hugebanner.jpg';
        break;
    }
  }

}
