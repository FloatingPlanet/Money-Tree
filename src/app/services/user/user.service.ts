import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {User} from '../../models/user';
import {Product} from '../../models/product';
import * as firebase from 'firebase';
import {User as FirebaseUser, UserCredential} from '@firebase/auth-types';
import {AngularFireAuth} from 'angularfire2/auth';
import {FlashMessageService} from '../flashMessage/flash-message.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public authState: FirebaseUser = null;
  public Users: AngularFirestoreCollection<User>;
  public user: User;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private fs: FlashMessageService,
              private router: Router) {
    this.Users = this.db.collection('Users');
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  get userOberservalbe() {
    if (this.currentUserId) {
      return this.Users.doc(this.currentUserId).valueChanges();
    }
  }

  public getCurrentUser() {
    return new Promise((res, rej) => {
      this.currentUserObservable.subscribe((auth) => {
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


  public addProduct(product: Product) {
    return new Promise((res, rej) => {
      this.currentUserObservable.subscribe((auth) => {
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

  public deleteProduct(SKU: number) {

  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authState.displayName || 'User without a Name';
    }
  }

  //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        this.updateUserData();
        this.fs.success('3rd party log in successful', 'You\'ve been logged in with ' + provider.providerId);
      })
      .catch(error => {
        this.fs.error('3rd party login failed', error.message);
        console.log(error);
      });
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((res: UserCredential) => {
        this.authState = res.user;
        this.updateUserData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(login) {
    return this.afAuth.auth.createUserWithEmailAndPassword(login.email, login.password)
      .then((credential: UserCredential) => {
        this.authState = credential.user;
        this.updateUserData();
        this.afAuth.auth.currentUser.updateProfile({displayName: login.username});
        this.fs.success('Sign up success', 'You\'ve been logged in');
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          this.fs.error('Sign up error', 'The password is too weak.');
        } else {
          this.fs.error('Sign up error', errorMessage);
        }
        console.log(error);
      });
  }

  emailLogin(login) {
    return this.afAuth.auth.signInWithEmailAndPassword(login.email, login.password)
      .then((res: UserCredential) => {
        this.authState = res.user;
        this.updateUserData();
        this.fs.success('Log in', 'You\'ve been logged in');
      })
      .catch(error => {
        console.log(error);
        this.fs.error('Log in failed', error.message);
      });
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
        this.fs.success('Password reset', 'An email with reset link has been sent to your email address. Please check your inbox');
      })
      .catch((error) => console.log(error));
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.fs.success('Log out', 'You\'ve been logged out');
    });

  }

  //// Helpers ////

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    this.Users.doc(this.currentUserId).set({
      email: this.currentUser.email,
      username: this.currentUser.displayName
    }, {merge: true});
  }

}

