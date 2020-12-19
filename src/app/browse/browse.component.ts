import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceProvider } from '../libs/models/service-provider';
//import { AuthenticationService } from '../libs/services/authentication.service';
import { ServiceProviderService } from '../libs/services/sp.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  searchForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  serviceProviders: ServiceProvider[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit() {
    this.getServiceProvider();

    this.searchForm = this.formBuilder.group({
            search: [''],
    });

    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  getServiceProvider() {
    this.serviceProviderService.getAll().pipe(first()).subscribe(results => {
      this.serviceProviders = results.data;
    });
    this.serviceProviderService.searchServiceProvider(this.route.snapshot.paramMap.get('search')).pipe(first()).subscribe(results => {
      console.log('elastic'+results);
    });
  }

}
