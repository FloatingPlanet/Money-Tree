import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { AuthService } from "../../services/login/auth.service";
import { FlashMessageService } from "../../services/flashMessage/flash-message.service";
import { User } from "../../models/user";
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  providers: [EmailValidator]
})
export class LoginPageComponent implements OnInit {
  user = {
    emailId: "",
    loginPassword: ""
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

  addUser(userForm: NgForm) {
    userForm.value["isAdmin"] = false;
    this.as
      .createUserWithEmailAndPassword(userForm.value["emailId"], userForm.value["password"])
      .then((res) => {
        const user: User = {
          isAdmin: false,
          email: res.user.email,
          username: res.user.displayName,
          uid: res.user.uid,
          verified_email: res.user.emailVerified,
          phoneNumber: res.user.phoneNumber,
          avatar: res.user.photoURL
        };

        this.us.createUser(user);

        this.fs.success("Registering", "User Registeration");

        setTimeout((router: Router) => {
          $("#createUserForm").modal("hide");
          this.router.navigate(["/"]);
        }, 1500);
      })
      .catch((err) => {
        this.errorInUserCreate = true;
        this.errorMessage = err;
        this.fs.error("Error while Creating User", err);
      });
  }

  signInWithEmail(userForm: NgForm) {
    this.as
      .signInRegular(userForm.value["emailId"], userForm.value["loginPassword"])
      .then((res) => {
        this.fs.success("Authentication Success", "Logging in please wait");

        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

        setTimeout((router: Router) => {
          this.router.navigate([returnUrl || "/"]);
        }, 1500);

        this.router.navigate(["/"]);
      })
      .catch((err) => {
        this.fs.error("Authentication Failed", "Invalid Credentials, Please Check your credentials");
      });
  }

  signinWithGoogle() {
    this.as.signInWithGoogle()
      .then(result => {
        console.log(result);
        this.fs.success("Success", "You are logged in via Google");
      })
      .catch(error => {
        console.log(error);
        this.fs.error("Fail", error.message);
      });
  }
}
