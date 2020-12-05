import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of }  from "rxjs";

//import { User } from '../models/user';
import { APP_CONFIG, AppConfig } from '../../app-config.module';

@Injectable({ providedIn: 'root' })
export class ServiceProviderService {
    constructor(
      private http: HttpClient,
      @Inject(APP_CONFIG) private config: AppConfig) { }

    getAll() {
        return this.http.get<any>(`${this.config.apiEndpoint}/sp`);
    }

    getServiceProvider(id: string) {
        if(id == ""){
          return of([])
        }
        else {
          return this.http.get<any>(`${this.config.apiEndpoint}/sp/${id}`);
        }
    }

    createSp(displayName: string, description: string, categories: [{name: string}], user: string) {
        let data = {
          "displayName": displayName,
          "description": description,
          "categories": categories,
          "user": user
        }
        return this.http.post<any>(`${this.config.apiEndpoint}/sp`, data)
            .pipe(map(sp => {
                // Register successful created user is returned

                return sp;
            }));
    }

    updateSp(id: string, displayName: string, description: string, categories: [{name: string}]) {
        let data = {
          "displayName": displayName,
          "description": description,
          "categories": categories
        }
        return this.http.put<any>(`${this.config.apiEndpoint}/sp/${id}`, data)
            .pipe(map(sp => {
                // Register successful created user is returned

                return sp;
            }));
    }
}
