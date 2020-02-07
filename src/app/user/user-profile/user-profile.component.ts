import {Component, OnInit,  ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AddressInfo} from '../../models/addressInfo';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators, FormGroupDirective} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public addressList: AddressInfo[];
  closeResult: string;
  saFormGroup: FormGroup;
  @ViewChild(FormGroupDirective, {static: false}) formGroupDirective: FormGroupDirective;

  constructor(private router: Router,
              private modalService: NgbModal, private formBuilder: FormBuilder,
              private us: UserService) {

  }

  ngOnInit() {
    this.saFormGroup = this.addressFormBuilder();

    this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.us.userObservable.subscribe((res: User) => {
          const user = res as User;
          this.addressList = user.shippingInfo;
        });
      } else {
         // TODO: implemement log in modal;
        console.log('Need to log in');
      }
    });
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

  private resetForm() {
    this.saFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
      }),
      address: this.formBuilder.group({
        street1: [null, Validators.required],
        street2: [null, Validators.required],
        city: [null, Validators.required],
        province: [null, Validators.required],
        postalCode: [null, Validators.required],
        country: [null, Validators.required],
      }),
    });
  }

  private onSubmit(af: FormGroup) {
    console.log(af.value);
    const address = {
      addressId: 'A' + Date.now().toString(),
      customer: {
        firstName: af.get('customer').value.firstName,
        lastName: af.get('customer').value.lastName,
        phoneNumber: af.get('customer').value.phoneNumber,
      },
      address: {
        street1: af.get('address').value.street1,
        street2: af.get('address').value.street2,
        city: af.get('address').value.city,
        province: af.get('address').value.province,
        postalCode: af.get('address').value.postalCode,
        country: af.get('address').value.country,
      },
    };
    console.log(address);

    this.us.addAddress(address).then((result) => {
      console.log(result);
      this.formGroupDirective.resetForm();
    }).catch((error) => {
      console.log(error);
    });

  }
}
