import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';
import { FlashMessageService } from '../../services/flashMessage/flash-message.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(
    private as: AuthService,
    private fs: FlashMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() { }


}
