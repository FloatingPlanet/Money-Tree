import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AddressService} from '../../../services/address/address.service';
import {AddressInfo} from '../../../models/addressInfo';
import {UserService} from '../../../services/user/user.service';

declare var Stripe;

export enum logginStatus {
  notLogged = 1,
  loggedWithoutAddress,
  loggedWithAddress,
}

export enum checkoutStep {
  shippingAddress = 1,
  billingAddress,
  payment,
}

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})


export class CheckoutFormComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder,
              private as: AddressService,
              private us: UserService) {
  }

  get Status() {
    return logginStatus;
  }
  // get which form we are currently editting.
  get Step() {
    return checkoutStep;
  }

  // public isLinear = true;
  public sameAddress = true;
  public saFormGroup: FormGroup;
  public baFormGroup: FormGroup;
  public ccFormGroup: FormGroup;
  public addressList: AddressInfo[];
  private logInObservable$: Subscription;
  private addressObservable$: Subscription;
  public searching = false;
  public searchFailed = false;
  public currentStatus: logginStatus;
  public currentStep: checkoutStep;
  // user pick address from list
  public saAddressSelected: AddressInfo;
  public baAddressSelected: AddressInfo;
  public isAddingAddress = false;
  // Track if has already modified form group
  public modifiedSAForm = false;
  public modifiedBAForm = false;
  public modifiedPayment = false;

  ngOnInit() {
    // init form group
    this.saFormGroup = this.addressFormBuilder();
    this.baFormGroup = this.saFormGroup;
    this.ccFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expireDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
    // init loggin status, and what to show in SA, BA field.
    this.logInObservable$ = this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.addressObservable$ = this.us.userAddressObservable.subscribe((addresses: AddressInfo[]) => {
          this.addressList = addresses;
          if (addresses) {
            this.currentStatus = logginStatus.loggedWithAddress;
          } else {
            this.currentStatus = logginStatus.loggedWithoutAddress;
          }
        });
      } else {
        this.currentStatus = logginStatus.notLogged;
        // TODO: implement log in modal;
        console.log('Need to log in');
      }
    });

    // init which step we are in.
    this.currentStep = checkoutStep.shippingAddress;
  }

  public changeBAform() {
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

  // TODO auto fill out all fields
  // TODO validate credit card

  submitOrder() {

  }

  ngOnDestroy(): void {
    if (this.logInObservable$) {
      this.logInObservable$.unsubscribe();
    }
    if (this.addressObservable$) {
      this.addressObservable$.unsubscribe();
    }
  }

  onSubmitSaFormGroup() {
    this.currentStep = checkoutStep.billingAddress;
    this.modifiedSAForm = true;
    let address: AddressInfo;
    switch (this.currentStatus) {
      case(logginStatus.notLogged):
        console.log(`nothing happens here`);
        break;
      case(logginStatus.loggedWithoutAddress):
        address = this.generateAddress(this.saFormGroup);
        this.saAddressSelected = address;
        this.us.addAddress(address).then(r => {
        });
        console.log(`address ${address.addressId} added`);
        break;
      case(logginStatus.loggedWithAddress):
        if (this.saAddressSelected) {
          // saFormGroup is equal to the selected address
          this.castAddressToForm(this.saAddressSelected);
        } else {
          console.log(this.saFormGroup);
        }
        break;
      default:
        break;
    }
  }
  onSubmitBaFormGroup() {
  this.modifiedBAForm = true;
  this.currentStep = checkoutStep.payment;
  this.modifiedPayment = true;
  if (!this.sameAddress) {
    this.baAddressSelected = this.generateAddress(this.baFormGroup);
  } else {
    this.baAddressSelected = this.saAddressSelected;
  }
  }
  // parse formGroup to object
  public generateAddress(af: FormGroup) {
    return {
      address: {
        city: af.get('address').value.city,
        country: af.get('address').value.country,
        postalCode: af.get('address').value.postalCode,
        province: af.get('address').value.province,
        street1: af.get('address').value.street1,
        street2: af.get('address').value.street2,
      },
      addressId: 'A' + Date.now().toString(),
      customer: {
        firstName: af.get('customer').value.firstName,
        lastName: af.get('customer').value.lastName,
        phoneNumber: af.get('customer').value.phoneNumber,
      },
    };
  }

  // parse address object to form
  private castAddressToForm(a: AddressInfo) {
    this.saFormGroup.setValue({
      customer: {
        firstName: a.customer.firstName,
        lastName: a.customer.lastName,
        phoneNumber: a.customer.phoneNumber
      },
      address: {
        street1: a.address.street1,
        street2: a.address.street2,
        city: a.address.city,
        province: a.address.province,
        postalCode: a.address.postalCode,
        country: a.address.country,
      }
    });

  }

  public addAddressToDB() {
    const address = this.generateAddress(this.saFormGroup);
    this.us.addAddress(address).then((res: string) => {
      this.isAddingAddress = !this.isAddingAddress;
      this.saFormGroup.reset();
    });

  }

  public triggerAddressForm() {
    this.isAddingAddress = !this.isAddingAddress;
    // reset addressSelected user may pick address then decide to add new address
    this.saAddressSelected = null;
    this.saFormGroup.reset();
  }

  public clickOnExistShippingAddress(address: AddressInfo) {
    this.isAddingAddress = false;
    this.saAddressSelected = address;
    this.castAddressToForm(this.saAddressSelected);
  }

  editPayment() {
    this.currentStep = checkoutStep.payment;
  }

  editBillingForm() {
    this.currentStep = checkoutStep.billingAddress;
  }

  editShippingForm() {
    this.currentStep = checkoutStep.shippingAddress;
  }


}
