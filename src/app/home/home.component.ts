import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ServiceProvider } from '../libs/models/service-provider';
//import { AuthenticationService } from '../libs/services/authentication.service';
import { ServiceProviderService } from '../libs/services/sp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  serviceProviders: ServiceProvider[] = [];
   breakpoint: number;

  constructor(
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit() {
    this.getServiceProvider();
    this.breakpoint = (window.innerWidth <= 1080) ? 3 : 5;
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1080) ? 3 : 5;
  }

  getServiceProvider() {
    this.serviceProviderService.getAll().pipe(first()).subscribe(results => {
            this.serviceProviders = results.data;
    });
  }

}
