/**
 * Modify this file to fetch and display the login details
 */
import {Component, OnInit} from "@angular/core";
import {UserType} from "../types/user.type";
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {map} from "rxjs/operators";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  user: UserType = {}; // type this variable using user.type.ts file
  constructor(private router: Router, private usersService:UsersService) {}

  ngOnInit() {
    console.log(this.router.url);
    this.user.username = this.router.url.split('/')[2];
    this.usersService.getUsers().pipe(map(value => console.log(value))).subscribe();
  }

  ngOnDestroy() {}
}
