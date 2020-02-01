import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './services/login/auth.service';
import {UserService} from './services/user/user.service';
import {CartService} from './services/cart/cart.service';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'money-tree';
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  private logInfo: any;
  private itemInCart: number;
  @ViewChild(NavBarComponent, {static: false}) navBar: NavBarComponent;

  constructor(private as: AuthService, private cs: CartService, private us: UserService) {

  }

  ngOnInit(): void {
    this.as.currentUserObservable.subscribe((auth) => {
      if (auth && this.cs.loadFromLocal().length > 0) {
        this.cs.loadFromLocal().forEach(product => {
          this.us.addProduct(product).then((res) => {
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
