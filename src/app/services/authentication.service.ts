import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginResponseType} from "../types/loginResponse.type";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    constructor(private http: HttpClient) {
    }

    // modify the return type to properly use the full response
    login(username: string, password: string): Observable<LoginResponseType> {
        // implement here
        return this.http.post<LoginResponseType>('https://reqres.in/api/login ', {
            username: username,
            password: password
        });
    }
}
