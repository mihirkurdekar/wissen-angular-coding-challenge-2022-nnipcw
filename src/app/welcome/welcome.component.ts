/**
 * Modify this file to fetch and display the login details
 */
import {Component, OnInit} from "@angular/core";
import {UserType} from "../types/user.type";
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {map, takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

@Component({
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
    user: UserType = {}; // type this variable using user.type.ts file
    private ngUnsubscribe = new Subject<void>();

    constructor(private router: Router, private usersService: UsersService) {
    }

    ngOnInit() {
        console.log(this.router.url);
        this.user.username = this.router.url.split('/')[2];
        // this.getUsers();
    }

    getUsers(): Observable<UserType[]> {
        return this.usersService.getUsers()
            .pipe(
                map(value => {
                    console.log(value['data']);
                    return value['data'];
                }),
            );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
