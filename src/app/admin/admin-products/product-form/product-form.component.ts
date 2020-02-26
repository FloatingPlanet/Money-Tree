import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ProductService} from 'src/app/services/product/product.service';
import {Product} from 'src/app/models/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() succeeded: boolean;
  @Output() public formModified = new EventEmitter<FormGroup>();

  public SKU: string;
  public productForm: FormGroup;
  public product: Product;
  public notEditable = false;

  constructor(private formBuilder: FormBuilder, private ps: ProductService, private route: ActivatedRoute) {
    this.resetForm();
    this.SKU = this.route.snapshot.paramMap.get('SKU');
    if (this.SKU) {
      this.ps.fetchProduct(this.SKU).then(result => {
        this.notEditable = !this.notEditable;
        this.product = result as Product;
        this.productForm.setValue({
          SKU: this.product.SKU,
          productId: this.product.productId,
          productName: this.product.productName,
          productCategory: this.product.productCategory,
          productSummary: this.product.productSummary,
          productPrice: this.product.productPrice,
          productDescription: this.product.productDescription,
          productImageUrls: this.product.productImageUrls,
          productAddedAt: this.product.productAddedAt,
          productQuantity: this.product.productQuantity,
          ratings: this.product.ratings,
          favourite: this.product.favourite,
          productSeller: this.product.productSeller,
        });
        console.log(this.productForm.controls.SKU.value);
      }).catch(error => console.error(error));
    }
  }


  ngOnInit() {
  }


  onSubmit(fg: FormGroup) {
    this.formModified.emit(fg);
  }

  resetForm() {
    this.productForm = this.formBuilder.group({
      SKU: [null, Validators.required],
      productId: [null, Validators.required],
      productName: [null, Validators.required],
      productCategory: [],
      productSummary: null,
      productPrice: [null, Validators.required],
      productDescription: [null, Validators.required],
      productImageUrls: [null, Validators.required],
      productAddedAt: new Date(),
      productQuantity: [null, [Validators.required, Validators.pattern('\\d*')]],
      ratings: [null, Validators.required],
      favourite: false,
      productSeller: null,
    });
  }
}
