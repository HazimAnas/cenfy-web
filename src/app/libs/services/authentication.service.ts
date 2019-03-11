import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../app-config.module';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    constructor(
      private http: HttpClient,
      private router: Router,
      @Inject(APP_CONFIG) private config: AppConfig
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**

     * @returns {Observable<T>}

     */

    isLoggedIn() : Observable<boolean> {
        return this.isLoginSubject.asObservable();
      }

    /**

   * if we have token the user is loggedIn

   * @returns {boolean}

   */

    private hasToken() : boolean {
      return !!localStorage.getItem('currentUser');
    }

    login(email: string, password: string) {
        let data = {
          "email": email,
          "password": password
        }
        return this.http.post<any>(`${this.config.apiEndpoint}/auth/login`, data)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.isLoginSubject.next(true);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.isLoginSubject.next(false);
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}
