import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Location } from '@angular/common';
import {ProductService} from 'src/app/services/product/product.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
  public selectedCategories: string[];
  public succeeded = false;
  public submitted = false;

  constructor(private ps: ProductService, private location: Location) {

  }

  ngOnInit() {
  }

  public gimmeDatCategories(categoriesFromChild: string[]) {
    console.log(categoriesFromChild + ' : I am parent, I got cats');
    this.selectedCategories = categoriesFromChild;
  }

  public iNeedaUpdateProduct(fg: FormGroup) {
    console.log(fg.value + ' : I am parent, I got detail');
    this.submitted = true;
    // show loading spinner
    fg.patchValue({productCategory: this.selectedCategories ? this.selectedCategories : []});
    this.ps.addProduct(fg.value).then(result => {
        console.log(result);
        this.succeeded = true;
        this.submitted = false;
        setTimeout(() => {
          // jump back to previous page
          this.location.back();
        },
        500);
      }
    ).catch(error => console.error(error));
  }


}

