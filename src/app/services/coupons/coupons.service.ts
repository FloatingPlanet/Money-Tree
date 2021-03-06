import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import {Coupon} from 'src/app/models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private Coupons: AngularFirestoreCollection<Coupon>;
  public allCoupons: Coupon[];

  constructor(private db: AngularFirestore) {
    this.Coupons = db.collection('Coupons', ref => ref.orderBy('addedAt').limit(100));
    this.Coupons.valueChanges().subscribe((coupons) => {
      this.allCoupons = coupons;
    });
  }

  /*
  return coupons observable
   */
  get couponsObservable() {
    return this.Coupons.valueChanges();
  }

  /*
  validate coupon @c with coupons in firebase
   */
  public validateCoupon(c: string) {
    const functions = firebase.functions();
    const validateCoupon = functions.httpsCallable('validateCoupon');
    return new Promise((resolve, reject) => {
      validateCoupon(c).then((res) => {
        if (res.data.valid) {
          resolve(res.data.doc);
        } else {
          reject(`fetch doc ${c} failed`);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /*
  delete @coupon from firebase
   */
  public deleteCoupons(coupon: string) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(coupon).delete().then(() => {
        resolve(`remove Coupon ${coupon} succeed`);

      }).catch((error) => {
        console.log(error);
        reject(`fetch doc ${coupon} failed`);
      });
    });
  }

  /*
  add new @coupon in firebase
   */
  public addCoupon(coupon: Coupon) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(coupon.coupon).ref.get().then((doc) => {
        this.Coupons.doc(coupon.coupon)
          .set(coupon)
          .catch(error => {
            console.error(error);
            reject('Add coupon failed');
          });
        resolve(`doc ${coupon.coupon} added`);
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${coupon.coupon} failed`);
      });
    });

  }

  /*
  retrieve a coupon using @couponName
   */
  public fetchCoupon(couponName: string) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(couponName).ref.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(`${couponName} does not exist`);
        }
      }).catch((error) => {
        console.log(error);
        reject(`fetch coupon ${couponName} failed`);
      });
    });
  }
}
