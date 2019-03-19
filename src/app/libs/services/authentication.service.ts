import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../app-config.module';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    /**

    * Variable declarations

    */
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private currentUserTokenSubject: BehaviorSubject<string>;
    public currentUserToken: Observable<string>;
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    constructor(
      private http: HttpClient,
      private router: Router,
      @Inject(APP_CONFIG) private config: AppConfig
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUserToken')));
        this.currentUserToken = this.currentUserTokenSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentUserTokenValue(): string {
        return this.currentUserTokenSubject.value;
    }

    /**

     * @returns {Observable<T>}

     */
    isLoggedIn() : Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }

    /**

    * Check if there's a token. Token only available if logged in.

    * @returns {boolean}

   */
    private hasToken() : boolean {
      return !!localStorage.getItem('currentUser');
    }

    /**

    * Check if there's a token. Token only available if logged in.

    * @returns {any}

    */
    login(email: string, password: string) : any {
        let data = {
          "email": email,
          "password": password
        }
        return this.http.post<any>(`${this.config.apiEndpoint}/auth/login`, data)
            .pipe(map(user => {
                /** login successful if there's a jwt token in the response */
                if (user && user.token) {
                    /** store user details and jwt token in local storage to keep user logged in between page refreshes */
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                    localStorage.setItem('currentUserToken', JSON.stringify(user.token));
                    /** Add user data in current user variable */
                    this.currentUserSubject.next(user);
                    /** set login status to true */
                    this.isLoginSubject.next(true);
                }

                return user;
            }));
    }

    /**

    * Logout current user.

    * @returns {void}

    */
    logout() : void {
        /** set login status to false */
        this.isLoginSubject.next(false);
        /** remove user from local storage to log user out */
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        /** Remove user data in current user variable */
        this.currentUserSubject.next(null);
        /** Redirect to login page */
        this.router.navigate(['/login']);
    }
}
