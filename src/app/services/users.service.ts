import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserType} from "../types/user.type";

@Injectable({providedIn: 'root'})
export class UsersService {
    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<any> {
        return this.http.get<any>(
            'https://reqres.in/api/unknown',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-type': 'application/json'
                }
            });
    }

}
