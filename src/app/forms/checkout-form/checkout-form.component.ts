import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
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
  public isLinear = true;
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
  // flag for showing list of saved address
  public showAddressList = true;

  constructor(private formBuilder: FormBuilder, private as: AddressService, private us: UserService) {
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

  get Status() {
    return Status;
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
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.as.getAddress(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            console.log('search failed');
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

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

  onSubmitSaFormGroup(sa: FormGroup) {
    let address: AddressInfo;
    switch (this.currentStatus) {
      case(Status.notLogged):
        console.log(`nothing happens here`);
        break;
      case(Status.loggedWithoutAddress):
        address = this.generateAddress(sa);
        this.us.addAddress(address).then(r => {
        });
        console.log(`address ${address.addressId} added`);
        break;
      case(Status.loggedWithAddress):
        if (this.addressSelected) {
          // saFormGroup is equal to the selected address
          this.castAddressToForm(this.addressSelected);
        } else if (this.saFormGroup.valid) {
          address = this.generateAddress(sa);
          this.us.addAddress(address).then((res: string) => {
            this.showAddressList = true;
          });
        }
        break;
      default:
        break;
    }
    this.showAddressList = true;
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

  //
  public triggerAddressForm() {
    // this.showAddressList = !this.showAddressList;
    // reset addressSelected user may pick address then decide to add new address
    this.addressSelected = null;
    this.saFormGroup.reset();
  }

  public updateShippingAddress(address: AddressInfo) {
    this.addressSelected = address;
    this.castAddressToForm(this.addressSelected);

  }
}
