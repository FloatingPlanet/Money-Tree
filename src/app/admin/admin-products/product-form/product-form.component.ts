import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormArray, Form} from '@angular/forms';
import {ProductService} from 'src/app/services/product/product.service';
import {Product, UrlItem} from 'src/app/models/product';
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
  public imagesUrls = [];

  constructor(private formBuilder: FormBuilder, private ps: ProductService, private route: ActivatedRoute) {
    this.initForm();
    this.SKU = this.route.snapshot.paramMap.get('SKU');
    if (this.SKU) {
      this.ps.fetchProduct(this.SKU).then(result => {
        this.notEditable = !this.notEditable;
        this.product = result as Product;
        this.getProductImageUrls.clear();
        this.product.productImageUrls.forEach((item: any) => {
          this.getProductImageUrls.push(this.formBuilder.group({url: item.url}));
        });
        this.productForm.patchValue({
          SKU: this.product.SKU,
          productId: this.product.productId,
          productName: this.product.productName,
          productCategory: this.product.productCategory,
          productSummary: this.product.productSummary,
          productPrice: this.product.productPrice,
          productDescription: this.product.productDescription,
          productAddedAt: this.product.productAddedAt,
          productQuantity: this.product.productQuantity,
          ratings: this.product.ratings,
          favourite: this.product.favourite,
          productSeller: this.product.productSeller,
        });
        console.log(this.productForm.controls.SKU.value);
        console.log(this.getProductImageUrls);
      }).catch(error => console.error(error));
    }
  }


  ngOnInit() {
  }


  onSubmit(fg: FormGroup) {
    this.formModified.emit(fg);
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      SKU: [null, Validators.required],
      productId: [null, Validators.required],
      productName: [null, Validators.required],
      productCategory: [],
      productSummary: null,
      productPrice: [null, Validators.required],
      productDescription: [null, Validators.required],
      productImageUrls: this.formBuilder.array(
        [this.formBuilder.group({url: ''})]),
      productAddedAt: new Date(),
      productQuantity: [null, [Validators.required, Validators.pattern('\\d*')]],
      ratings: [null, Validators.required],
      favourite: false,
      productSeller: null,
    });
  }

  get getProductImageUrls() {
    return this.productForm.get('productImageUrls') as FormArray;
  }

  public addUrl() {
    this.getProductImageUrls.push(this.formBuilder.group({url: ''}));
  }

  public deleteUrl(index) {
    this.getProductImageUrls.removeAt(index);
  }
}
