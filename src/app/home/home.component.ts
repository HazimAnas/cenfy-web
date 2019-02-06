import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ServiceProvider } from '../libs/models/service-provider';
//import { AuthenticationService } from '../libs/services/authentication.service';
import { ServiceProviderService } from '../libs/services/sp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  serviceProviders: ServiceProvider[] = [];

  constructor(private serviceProviderService: ServiceProviderService) { }

  ngOnInit() {
    this.serviceProviderService.getAll().pipe(first()).subscribe(results => {
            this.serviceProviders = results.data;
    });
  }

}
