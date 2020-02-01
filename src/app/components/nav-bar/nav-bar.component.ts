import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AuthService} from 'src/app/services/login/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnChanges {
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  @Input() info: any;
  private itemInCart: number;

  constructor(private as: AuthService, private us: UserService) {
  }

  ngOnInit() {
    // TODO user logout and login data is not consistent, and shopping cart has same shit
    if (this.us.userOberservalbe) {
      this.us.userOberservalbe.subscribe(res => {
        this.itemInCart = (res as User) ? (res as User).cart ? (res as User).cart.length : null : null;
      });
    }
  }

  logout() {
    this.as.signOut();
  }

  ngOnChanges(): void {

  }

}
