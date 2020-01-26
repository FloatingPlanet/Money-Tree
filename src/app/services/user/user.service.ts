import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,} from 'angularfire2/firestore';
import {User} from '../../models/user';
import {AuthService} from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Users: AngularFirestoreCollection<User>;
  public user: User;

  constructor(private db: AngularFirestore, private as: AuthService) {
    this.Users = this.db.collection('Users');
    this.as.currentUserObservable.subscribe((auth) => {
      if (auth) {
        this.Users.doc(auth.uid).ref.get().then((doc) => {
          this.user = doc.data() as User;
        }).catch((error) => {
          console.log(error);
        });
      }
    });

  }

  get userOberservalbe() {
    return this.Users.valueChanges();
  }

}
