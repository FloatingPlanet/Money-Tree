import {Component, OnInit} from '@angular/core';
import {GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'app-product-quick-look',
  templateUrl: './product-quick-look.component.html',
  styleUrls: ['./product-quick-look.component.scss']
})
export class ProductQuickLookComponent implements OnInit {
  private Key = 'EE77-JU96-FM31-NM51';
  private SearchTerm: string;
  private LocationAccuracy: number;
  private Country: string;
  private LanguagePreference: string;
  private Locations: string;
  private addr: string;

  constructor() {
  }


  ngOnInit() {

  }


}
