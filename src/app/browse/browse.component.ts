import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ServiceProvider } from '../libs/models/service-provider';
//import { AuthenticationService } from '../libs/services/authentication.service';
import { ServiceProviderService } from '../libs/services/sp.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  serviceProviders: ServiceProvider[] = [];

  constructor(
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit() {
    this.getServiceProvider();
  }

  getServiceProvider() {
    this.serviceProviderService.getAll().pipe(first()).subscribe(results => {
            this.serviceProviders = results.data;
    });
  }

}
