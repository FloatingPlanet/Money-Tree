import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
  selectedCategories: string[];
  constructor(private ps: ProductService) { }

  ngOnInit() {
  }
  public fetchCategories(cats: string[]) {
    console.log(cats + " : I am parent, I got cats");
    this.selectedCategories = cats;
  }
  public fetchProductDetail(fb: FormGroup) {
    console.log(fb.value + " : I am parent, I got detail");
    fb.patchValue({ productCategory: this.selectedCategories ? this.selectedCategories : [] });
    this.ps.addProduct(fb.value).then(result => console.log(result)).catch(error => console.error(error));
    fb.reset();
  }
}

