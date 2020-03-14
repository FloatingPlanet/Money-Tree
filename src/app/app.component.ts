import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FloatingPlanet';
  DEFAULT_AVATAR = '../../../assets/default-avatar.png';
  DEFAULT_NAME = 'Shady Individual';
  constructor(private us: UserService) {
  }

  ngOnInit(): void {
  }
}
