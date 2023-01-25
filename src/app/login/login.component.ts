import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from "../services/authentication.service";

@Component({
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({});
  }

  ngOnDestroy() {}

  onSubmit() {
    // 
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator() {
    return false;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator() {
    return false;
  }
}
