import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  isLinear = true;
  saFormGroup: FormGroup;
  baFormGroup: FormGroup;
  ccFormGroup: FormGroup;
  sameAddress = true;
  proceedToPlaceOrder: boolean;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.saFormGroup = this.addressFormBuilder();
    this.baFormGroup = this.saFormGroup;
    this.ccFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expireDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  private changeBAform() {
    if (!this.sameAddress) {
      this.baFormGroup = this.saFormGroup;
    } else {
      this.baFormGroup = this.addressFormBuilder();
    }
  }

  private addressFormBuilder() {
    return this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
      }),
      address: this.formBuilder.group({
        street1: ['', Validators.required],
        street2: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });
  }

  //TODO validate credit card
  submitOrder() {

  }
}
