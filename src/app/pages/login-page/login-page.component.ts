import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';
import { FlashMessageService } from '../../services/flashMessage/flash-message.service';
import { User } from '../../models/user';
import {LocalstorageService} from "../../services/localStorage/localstorage.service";
import {Product} from "../../models/product";


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  private submitted = false;
  private cartProduct: Product[];
  private loginForm: FormGroup;
  private resetForm: FormGroup;
  constructor(
    private as: AuthService,
    private fs: FlashMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ls: LocalstorageService
  ) {
  }

  get form() {return this.loginForm.controls; }

  ngOnInit() {
    this.as.currentUserObservable.subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  emailLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.as.emailLogin(this.loginForm.value);
  }
  loginWithGoogle() {
    this.as.googleLogin();
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }
    this.as.resetPassword(this.resetForm.value.email);
  }
  reset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
