import {Injectable} from '@angular/core';
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

  constructor(private db: AngularFirestore) {
    this.Coupons = db.collection('Coupons', ref => ref.orderBy('productAddedAt').limit(100));

  }

  public valiateCoupon(c: string) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(c).ref.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(`${c} does not exist`);
        }
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${c} failed`);
      });
    });
  }


}
