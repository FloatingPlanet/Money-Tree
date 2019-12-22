import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;

  dbUser;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.user = firebaseAuth.authState;
  }

  isLoggedIn(): boolean {
    if (this.userDetails !== null) {
      return true;
    }
  }

  logout() {
    // this.loggedUser = null;
    this.firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      emailID,
      password
    );
  }

  getLoggedInUser(): User {
    const loggedUser: User = new User();
    const user = this.firebaseAuth.auth.currentUser;

    return loggedUser;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    // console.log("loggedUSer", user)
    if (user != null) {
      return user.isAdmin;
    }
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
