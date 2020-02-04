import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {CartService} from '../../services/cart/cart.service';
import {Product} from '../../models/product';

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

  constructor(private us: UserService, private cs: CartService) {
  }

  ngOnInit() {
    // TODO user logout and login data is not consistent, and shopping cart has same shit
    this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.us.userOberservalbe.subscribe((res: User) => {
          console.log('nav cart updated');
          this.itemInCart = res.cart ? res.cart.length : null;
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
