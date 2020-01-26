import {Component} from '@angular/core';
import {AuthService} from './services/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'money-tree';
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  avatarURL: string;
  displayName: string;
  authState = null;
  logInfo: any;

  constructor(private as: AuthService) {
    this.as.currentUserObservable.subscribe((auth) => {
      this.authState = auth;
      this.logInfo = {
        avatarURL: auth ? auth.photoURL : this.DEFAULT_AVATAR,
        displayName: auth ? auth.displayName : this.DEFAULT_NAME,
        authState: !!auth
      };
    });
  }

}
