import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {Subscription} from 'rxjs';
import {CartService} from '../../services/cart/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnChanges, OnDestroy {
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  DEFAULT_EMAIL = 'hellothere!@floatingp.com';
  public logInfo: any;
  public itemInCart: number;
  private logInObservable$: Subscription;
  private userObservable$: Subscription;
  @Input() keyword: string;

  constructor(private us: UserService, private cs: CartService, private router: Router) {
    // TODO user logout and login data is not consistent, and shopping cart has same shit
    this.logInObservable$ = this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        this.userObservable$ = this.us.userObservable.subscribe((res) => {
          if (res) {
            console.log('cartSize updated', res.cartSize);
            this.itemInCart = res.cartSize === 0 ? null : res.cartSize;
            if (this.cs.getLocalCart().length > 0) {
              this.cs.getLocalCart().forEach(item => {
                this.us.addProductToCart(item.item).then(() => {
                }).catch((err) => {
                  console.error(err);
                });
              });
              this.cs.clearAll();
            }
          }
        });

      } else {
        this.itemInCart = this.cs.getLocalCart().length === 0 ? null : this.cs.getLocalCart().length;
      }
      this.logInfo = {
        avatarURL: auth ? this.us.currentUser?.photoURL : this.DEFAULT_AVATAR,
        displayName: auth ? this.us.currentUser?.displayName : this.DEFAULT_NAME,
        displayEmail: auth ? this.us.currentUser?.email : this.DEFAULT_EMAIL,
        authState: auth
      };
    });
  }

  ngOnInit() {

  }

  public logout() {
    this.us.signOut().then(() => {
      console.log('user log out');
    }).catch((error) => {
      console.error(error);
    });

  }

  ngOnChanges(): void {

  }

  ngOnDestroy(): void {
    if (this.logInObservable$) {
      this.logInObservable$.unsubscribe();
    }
    if (this.userObservable$) {
      this.userObservable$.unsubscribe();
    }
  }

  public searchProduct() {
    alert(this.keyword);
  }
}
