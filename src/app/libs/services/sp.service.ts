import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    getServiceProvider(id: String) {
        return this.http.get<any>(`${this.config.apiEndpoint}/sp/${id}`);
    }
}
