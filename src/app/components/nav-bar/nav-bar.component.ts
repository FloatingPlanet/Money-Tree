import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  avatarURL = this.DEFAULT_AVATAR;
  displayName = this.DEFAULT_NAME;
  authState = null;
  constructor(private as: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.as.currentUserObservable.subscribe((auth) => {
      this.authState = auth;
      if (auth) {
        this.avatarURL = auth.photoURL ? auth.photoURL : this.DEFAULT_AVATAR;
        this.displayName = auth.displayName ? auth.displayName : this.DEFAULT_NAME;
      } else {
        this.avatarURL = this.DEFAULT_AVATAR;
        this.displayName = this.DEFAULT_NAME;
      }
    });
  }

  logout() {
    this.as.signOut();
  }

}
