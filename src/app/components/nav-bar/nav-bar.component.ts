import {Component, Input, OnChanges, OnInit} from '@angular/core';
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

  constructor(private us: UserService) {
  }

  ngOnInit() {
    // TODO user logout and login data is not consistent, and shopping cart has same shit
    this.us.currentUserObservable.subscribe((auth) => {
      if (auth) {
        this.us.userOberservalbe.subscribe(res => {
          console.log('cart updated nav');
          this.itemInCart = (res as User) ? (res as User).cart ? (res as User).cart.length : null : null;
        });
      } else {
        this.itemInCart = null;
      }
    });

  }

  logout() {
    this.us.signOut();
  }

  ngOnChanges(): void {

  }

}
