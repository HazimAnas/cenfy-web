import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//import configuration file
import { APP_CONFIG, AppConfig } from '../../app-config.module';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  updateStatistic(type: string, id: string, name: string, value: number) {
    let data = {
      "type": type,
      "id": id,
      "name": name,
      "value": value
    }
    return this.http.post<any>(`${this.config.apiEndpoint}/sp`, data)
    .pipe(map(sp => {
        // Register successful created user is returned

        return sp;
    }));
  }
}
