import {Component, OnInit} from '@angular/core';
import {FlashMessageService} from 'src/app/services/flashMessage/flash-message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from 'src/helpers/helpers';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  submitted = false;

  signupForm: FormGroup;

  constructor(
    private us: UserService,
    private fs: FlashMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  get form() {
    return this.signupForm.controls;
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.us.currentUserObservable.subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  signup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.us.emailSignUp(this.signupForm.value);
  }

  signupWithGoogle() {
    this.us.googleLogin();
  }

  reset() {
    this.submitted = false;
    this.signupForm.reset();
  }

}
