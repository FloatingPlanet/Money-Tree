import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {CartService} from '../../services/cart/cart.service';
import {Subscription} from 'rxjs';
import {events} from 'stripe';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnChanges, OnDestroy {
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  @Input() info: any;
  public itemInCart: number;
  private logInObservable$: Subscription;
  @Input() keyword: string;
  constructor(private us: UserService) {
  }

  ngOnInit() {

  }
    // });
  // }

  logout() {
    this.us.signOut();
  }

  ngOnChanges(): void {
    // TODO user logout and login data is not consistent, and shopping cart has same shit
    // this.logInObservable$ = this.us.logInObservable.subscribe((auth) => {
    if (this.us.authenticated) {
      this.us.userObservable.subscribe((res: User) => {
        console.log('nav cart updated');
        this.itemInCart = res.cart ? res.cart.length : null;
      });
    } else {
      this.itemInCart = null;
    }
  }

  ngOnDestroy(): void {
    if (this.logInObservable$) {
      this.logInObservable$.unsubscribe();
    }
  }

  public searchProduct() {
    alert(this.keyword);
  }
}
