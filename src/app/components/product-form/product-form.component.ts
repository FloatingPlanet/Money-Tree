import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() detail: Product;
  @Output() onFormModified: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  selectedCategories: string[];
  subscription: Subscription;
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private ps: ProductService) {
    this.productForm = this.formBuilder.group({
      SKU: [null, Validators.required],
      productId: [null, Validators.required],
      productName: [null, Validators.required],
      productCategory: [],
      productSummary: null,
      productPrice: [null, Validators.required],
      productDescription: [null, Validators.required],
      productImageUrls: this.formBuilder.array(['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-space-select-201911?wid=400&hei=400&fmt=jpeg&qlt=95&op_usm=0.5,1.5&fit=constrain&.v=1572825197207']),
      productAddedAt: new Date(),
      productQuantity: [null, [Validators.required, Validators.pattern('\\d*')]],
      ratings: [null, Validators.required],
      favourite: false,
      productSeller: null,
    });
  }
  ngOnDestory() {
    this.subscription.unsubscribe();
  }
  ngOnInit() { }

  ngOnChanges() {
    if (this.detail) {
      let product = this.detail;
      this.productForm.setValue({
        SKU: product.SKU,
        productId: product.productId,
        productName: product.productName,
        productCategory: product.productCategory,
        productSummary: product.productSummary,
        productPrice: product.productPrice,
        productDescription: product.productDescription,
        productImageUrls: product.productImageUrls,
        productAddedAt: product.productAddedAt,
        productQuantity: product.productQuantity,
        ratings: product.ratings,
        favourite: product.favourite,
        productSeller: product.productSeller,
      })
    }
  }
  onSubmit(fg: FormGroup) {
    this.onFormModified.emit(fg);
  }



}
