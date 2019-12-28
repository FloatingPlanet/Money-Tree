import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';
import { FlashMessageService } from 'src/app/services/flashMessage/flash-message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MustMatch } from 'src/helpers/helpers';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  submitted = false;

  signupForm: FormGroup;
  constructor(
    private as: AuthService,
    private fs: FlashMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  get form() {return this.signupForm.controls; }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  signup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.as.emailSignUp(this.signupForm.value);
  }
  signupWithGoogle() {
    this.as.googleLogin();
  }
  reset() {
    this.submitted = false;
    this.signupForm.reset();
  }

}
