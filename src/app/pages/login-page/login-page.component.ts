import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/login/auth.service';
import { FlashMessageService } from '../../services/flashMessage/flash-message.service';
import { User } from '../../models/user';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user = {
    emailId: '',
    loginPassword: ''
  };

  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
    private as: AuthService,
    private us: UserService,
    private fs: FlashMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createUser = new User();
  }

  ngOnInit() { }

  addUser(userForm: FormGroup) {

  }

  signInWithEmail(userForm: FormGroup) {

  }

  signinWithGoogle() {

  }
}
