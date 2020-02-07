import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AddressService} from '../../services/address/address.service';


@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  public isLinear = true;
  public saFormGroup: FormGroup;
  public baFormGroup: FormGroup;
  public ccFormGroup: FormGroup;
  public sameAddress = true;
  public addresses: any;

  model: any;
  searching = false;
  searchFailed = false;

  constructor(private formBuilder: FormBuilder, private as: AddressService) {
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
}
