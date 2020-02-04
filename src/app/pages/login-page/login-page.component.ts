import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FlashMessageService} from '../../services/flashMessage/flash-message.service';
import {User} from '../../models/user';
import {LocalstorageService} from '../../services/localStorage/localstorage.service';
import {Product} from '../../models/product';
import {UserService} from '../../services/user/user.service';


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
    private us: UserService,
    private fs: FlashMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ls: LocalstorageService
  ) {
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.us.currentUserObservable.subscribe((auth) => {
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
    this.us.googleLogin();
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

}
