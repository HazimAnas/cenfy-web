import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { User } from '../models/user';

import { APP_CONFIG, AppConfig } from '../../app-config.module';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
      private http: HttpClient,
      @Inject(APP_CONFIG) private config: AppConfig) { }

    getAll() {
        return this.http.get<any>(`${this.config.apiEndpoint}/users`);
    }

    register(email: string, password: string, username: string, displayName: string) {
        let data = {
          "email": email,
          "password": password,
          "userName": username,
          "displayName": displayName
        }
        return this.http.post<any>(`${this.config.apiEndpoint}/users`, data)
            .pipe(map(user => {
                // Register successful created user is returned

                return user;
            }));
    }
}
