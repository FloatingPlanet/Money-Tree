import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ProductService} from 'src/app/services/product/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
  public selectedCategories: string[];
  public cLoaded = false;
  public pLoaded = false;
  public isHidden = true;

  constructor(private ps: ProductService, private route: ActivatedRoute) {
    if (!this.route.snapshot.paramMap.get('SKU')) {
      this.pLoaded = true;
    }
  }

  ngOnInit() {
  }

  public gimmeDatCategories(categoriesFromChild: string[]) {
    console.log(categoriesFromChild + ' : I am parent, I got cats');
    this.selectedCategories = categoriesFromChild;
  }

  public iNeedaUpdateProduct(fg: FormGroup) {
    console.log(fg.value + ' : I am parent, I got detail');
    fg.patchValue({productCategory: this.selectedCategories ? this.selectedCategories : []});
    this.ps.addProduct(fg.value).then(result => console.log(result)).catch(error => console.error(error));
  }

  public categoriesLoaded(loaded: boolean) {
    if (loaded) {
      this.cLoaded = true;
      if (this.cLoaded && this.pLoaded) {
        this.isHidden = false;
      }
    }
  }

  public productLoaded(loaded: boolean) {
    if (loaded) {
      this.pLoaded = true;
      if (this.cLoaded && this.pLoaded) {
        this.isHidden = false;
      }
    }
  }
}

