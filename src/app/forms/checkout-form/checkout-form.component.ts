import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AddressService} from '../../services/address/address.service';
import {AddressInfo} from '../../models/addressInfo';
import {UserService} from '../../services/user/user.service';

declare var Stripe;

export enum Status {
  notLogged = 1,
  loggedWithoutAddress,
  loggedWithAddress,
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
    return Status;
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
  public currentStatus: Status;
  // user pick address from list
  public addressSelected: AddressInfo;
  public isAddingAddress = false;

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

    this.logInObservable$ = this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.addressObservable$ = this.us.userAddressObservable.subscribe((addresses: AddressInfo[]) => {
          this.addressList = addresses;
          if (addresses) {
            this.currentStatus = Status.loggedWithAddress;
          } else {
            this.currentStatus = Status.loggedWithoutAddress;
          }
        });
      } else {
        this.currentStatus = Status.notLogged;
        // TODO: implement log in modal;
        console.log('Need to log in');
      }
    });
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
    let address: AddressInfo;
    switch (this.currentStatus) {
      case(Status.notLogged):
        console.log(`nothing happens here`);
        break;
      case(Status.loggedWithoutAddress):
        address = this.generateAddress(this.saFormGroup);
        this.us.addAddress(address).then(r => {
        });
        console.log(`address ${address.addressId} added`);
        break;
      case(Status.loggedWithAddress):
        if (this.addressSelected) {
          // saFormGroup is equal to the selected address
          this.castAddressToForm(this.addressSelected);
        } else {
          console.log(this.saFormGroup);
        }
        break;
      default:
        break;
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
    });

  }

  public triggerAddressForm() {
    this.isAddingAddress = !this.isAddingAddress;
    // reset addressSelected user may pick address then decide to add new address
    this.addressSelected = null;
    this.saFormGroup.reset();
  }

  public clickOnExistShippingAddress(address: AddressInfo) {
    // if and only if use is not adding new address, then
    // addressSelected will be updated
    if (!this.isAddingAddress) {
      this.addressSelected = address;
      this.castAddressToForm(this.addressSelected);
    } else {
      this.addressSelected = null;
      this.saFormGroup.reset();
    }
  }
}
