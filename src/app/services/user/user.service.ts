import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {User} from '../../models/user';
import {AuthService} from '../login/auth.service';
import {Product} from '../../models/product';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Users: AngularFirestoreCollection<User>;
  public user: User;

  constructor(private db: AngularFirestore, private as: AuthService) {
    this.Users = this.db.collection('Users');
  }

  get userOberservalbe() {
    return this.Users.valueChanges();
  }

  public getCurrentUser() {
    return new Promise((res, rej) => {
      this.as.currentUserObservable.subscribe((auth) => {
        if (auth) {
          this.Users.doc(auth.uid).ref.get().then((doc) => {
            res(doc.data());
          }).catch((error) => {
            rej(error);
          });
        }
      });
    });
  }


  addProduct(product: Product) {
    return new Promise((res, rej) => {
      this.as.currentUserObservable.subscribe((auth) => {
        if (auth) {
          this.Users.doc(auth.uid).update({
            cart: firebase.firestore.FieldValue.arrayUnion(product)
          }).catch(r => {
            console.error(r);
          });
        } else {
          rej('user is logged out');
        }
      });
    });
  }
}
