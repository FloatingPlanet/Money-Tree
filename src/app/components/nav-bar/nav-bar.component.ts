import {Component, Input, OnInit, Output} from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';
import { Router } from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  @Input() info: any;

  constructor(private as: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

  logout() {
    this.as.signOut();
  }

}
