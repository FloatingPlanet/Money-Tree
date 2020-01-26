import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl} from '@angular/forms';
import {CouponsService} from 'src/app/services/coupons/coupons.service';
import {Coupon} from '../../models/coupon';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.scss']
})
export class CouponFormComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  private couponForm: FormGroup;
  private couponName: string;
  private coupon: Coupon;
  private notEditable = false;
  private allCoupons: Coupon[];

  constructor(private formBuilder: FormBuilder, private cs: CouponsService, private route: ActivatedRoute, private router: Router) {

  }


  ngOnInit() {
    this.cs.couponsObservable.subscribe((res) => {
      this.allCoupons = res;
      this.resetForm();
    });
    this.couponName = this.route.snapshot.paramMap.get('coupon');
    if (this.couponName) {
      this.fetchCoupon();

    }
  }

  public onSubmit(cf: FormGroup) {
    this.cs.addCoupon(cf.value).then(result => console.log(result)).catch(error => console.error(error));
    this.router.navigate(['/admin/coupons']);
    this.resetForm();
  }

  private resetForm() {
    this.couponForm = this.formBuilder.group({
      coupon: [null, [Validators.required, this.existCoupon()]],
      discount: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      amount: [null, Validators.required],
      freeShipping: [null, Validators.required],
      minimumSpend: [null, Validators.required],
      addedAt: new Date(),
    });
  }

  private existCoupon(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const exist = this.allCoupons.some(x => x.coupon === control.value);
      return exist ? {existCoupon: {value: control.value}} : null;
    };
  }

  private fetchCoupon() {
    this.cs.fetchCoupon(this.couponName).then(res => {
      this.notEditable = true;
      this.coupon = res as Coupon;
      this.couponForm.setValue({
        coupon: this.coupon.coupon,
        discount: this.coupon.discount,
        from: this.coupon.from,
        to: this.coupon.to,
        amount: this.coupon.amount,
        freeShipping: this.coupon.freeShipping,
        minimumSpend: this.coupon.minimumSpend,
        addedAt: this.coupon.addedAt,
      });
      console.log(this.couponForm.value);
    }).catch((error) => console.log(error));
  }
}
