import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import * as moment from "moment";
import { User } from "../../models/user";

@Injectable()
export class UserService {
  selectedUser: User = new User();
  users: AngularFirestoreCollection<User>;

  location = {
    lat: null,
    lon: null
  };

  constructor(private db: AngularFirestore) {
    this.getUsers();
  }

  getUsers() {
    this.users = this.db.collection("users");
    return this.users;
  }

  createUser(user: User) {
    user.location = this.location;
    user.createdOn = new Date();
    user.isAdmin = false;
    this.users.add(user);
  }

  // isAdmin(email: string): Promise<boolean> {
  //   // return this.users.doc(email).snapshotChanges().toPromise().then((user: User)=>{
  //   //   return user.isAdmin;
  //   // });
  // }

  updateUser(user: User) {
    this.users.doc(user.uid).update(user);
  }

  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }
}
