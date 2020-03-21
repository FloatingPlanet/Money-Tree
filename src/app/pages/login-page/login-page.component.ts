import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FlashMessageService} from '../../services/flashMessage/flash-message.service';
import {UserService} from '../../services/user/user.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public submitted = false;
  public loginForm: FormGroup;
  public resetForm: FormGroup;
  private logInObservable$: Subscription;

  constructor(
    private us: UserService,
    private fs: FlashMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.logInObservable$ = this.us.logInObservable.subscribe((auth) => {
      if (auth) {
        // TODO rewrite
        this.router.navigate(['']);
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
    this.us.emailLogin(this.loginForm.value);
  }

  loginWithGoogle() {
    this.us.googleLogin().then(() => {
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }
    this.us.resetPassword(this.resetForm.value.email);
  }

  reset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    if (this.logInObservable$) {
      this.logInObservable$.unsubscribe();
    }
  }
}
