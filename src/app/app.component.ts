import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/login/auth.service';
import {UserService} from './services/user/user.service';
import {CartService} from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'money-tree';
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  logInfo: any;

  constructor(private as: AuthService, private cs: CartService, private us: UserService) {

  }

  ngOnInit(): void {
    this.as.currentUserObservable.subscribe((auth) => {
      if (auth && this.cs.loadFromLocal()) {
        this.cs.loadFromLocal().forEach(product => {
          this.us.addProduct(product).then(() => {
          }).catch((err) => {
            console.error(err);
          });
        });
      }
      this.logInfo = {
        avatarURL: auth ? auth.photoURL : this.DEFAULT_AVATAR,
        displayName: auth ? auth.displayName : this.DEFAULT_NAME,
        authState: !!auth
      };

    });
  }


}
