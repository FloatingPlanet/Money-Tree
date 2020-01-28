import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/login/auth.service';
import {UserService} from './services/user/user.service';

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

  constructor(private as: AuthService) {

  }

  ngOnInit(): void {
    this.as.currentUserObservable.subscribe((auth) => {
      if (auth) {

      }
      this.logInfo = {
        avatarURL: auth ? auth.photoURL : this.DEFAULT_AVATAR,
        displayName: auth ? auth.displayName : this.DEFAULT_NAME,
        authState: !!auth
      };
    });
  }


}
