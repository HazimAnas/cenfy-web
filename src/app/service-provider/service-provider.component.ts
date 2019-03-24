import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { first } from 'rxjs/operators';
import { ServiceProviderService } from '../libs/services/sp.service';
import { ServiceProvider } from '../libs/models/service-provider';


@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {

  serviceProvider: ServiceProvider;
  serviceProviderId: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceProviderId = params.get("id")
    });

    this.getServiceProviderData();
  }

  getServiceProviderData(): void {
    this.serviceProviderService.getServiceProvider(this.serviceProviderId).pipe(first()).subscribe(result => {
            //set result to user data
            this.serviceProvider = result.data;
            //update form values
            this.setValues();
    });
  }

  setValues(): void {
  }
}
