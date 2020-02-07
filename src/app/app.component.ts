import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './services/user/user.service';
import {CartService} from './services/cart/cart.service';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'money-tree';
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  public logInfo: any;
  public itemInCart: number;
  @ViewChild(NavBarComponent, {static: false}) navBar: NavBarComponent;

  constructor(private cs: CartService, private us: UserService) {
  }

  ngOnInit(): void {
    this.us.logInObservable.subscribe((auth) => {
      if (auth && this.cs.getLocalCart().length > 0) {
        this.cs.getLocalCart().forEach(product => {
          this.us.addProduct(product).then(() => {
          }).catch((err) => {
            console.error(err);
          });
        });
        this.cs.clearAll();
      }

      this.logInfo = {
        avatarURL: auth ? auth.photoURL : this.DEFAULT_AVATAR,
        displayName: auth ? auth.displayName : this.DEFAULT_NAME,
        authState: !!auth
      };
    });
  }


}
