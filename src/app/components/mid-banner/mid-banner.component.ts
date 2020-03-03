import {Component, Input, OnChanges,  OnInit} from '@angular/core';

@Component({
  selector: 'app-mid-banner',
  templateUrl: './mid-banner.component.html',
  styleUrls: ['./mid-banner.component.scss']
})
export class MidBannerComponent implements OnChanges, OnInit {
  @Input() path: string;
  public img: string;

  constructor() {

  }

  ngOnInit(): void {

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
