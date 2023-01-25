import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import {AuthenticationService} from "../services/authentication.service";
import {catchError, map, takeUntil} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Component({
    styleUrls: ["login.component.css"],
    templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    private ngUnsubscribe = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        // setup the loginform and validators
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required, this.usernameValidator],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    onSubmit() {
        if (this.loginForm.valid) {
            let username = this.loginForm.get('username').value;
            let password = this.loginForm.get('password').value;
            if (this.usernameValidator(username), this.passwordValidator(password)) {
                this.authenticationService.login(
                    username,
                    password
                ).pipe(
                    catchError(err => {
                        console.error(err);
                        return throwError(err);
                    }),
                    map(value => {
                        console.log(value);
                        localStorage.setItem('token', value.token);
                        this.router.navigateByUrl("welcome/" + username);
                    }),
                    takeUntil(this.ngUnsubscribe)
                ).subscribe();
            }
        }
    }

    // implement the username validator. Min 6 characters and no digits, special chars
    usernameValidator(username: string) {
        if (username.length >= 6 && username.match(/^[^a-zA-Z]+$/)) {
            return true;
        }
        return false;

    }

    // implement the password validator
    // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
    passwordValidator(password: string) {
        if (password.length >= 8 && password.match(/^[^a-z]+[A-Z]+$/)) {
            return true;
        }
        return false;
    }
}
