import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { ServiceProvider } from '../libs/models/service-provider';
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
  serviceProviders2: ServiceProvider[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit() {
    this.getServiceProvider();
    this.loading = false;
    this.searchForm = this.formBuilder.group({
            search: [''],
    });

    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/browse/all';
  }

  getServiceProvider() {
    this.loading = false;
    this.serviceProviderService.searchServiceProvider(this.route.snapshot.paramMap.get('search')).pipe(first()).subscribe(results => {
      this.serviceProviders = results.data.body.hits.hits;
      console.log(this.serviceProviders);
    });
  }

  onSubmitSearch() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.searchForm.invalid) {
        return;
      }

      this.loading = true;
      if (this.searchForm.controls['search'].value !== '') {
        this.serviceProviderService.searchServiceProvider(this.searchForm.controls['search'].value).pipe(first()).subscribe(results => {
          this.serviceProviders = results.data.body.hits.hits;
        });
        this.location.go('browse/'+this.searchForm.controls['search'].value);
        this.loading = false;
        return;
      }
      this.loading = false;
      this.location.go(this.returnUrl);
      this.getServiceProvider();
    }

    onSubmitSearchCategory(category: string) {
        this.loading = true;
        this.serviceProviderService.searchServiceProvider(category).pipe(first()).subscribe(results => {
          this.serviceProviders = results.data.body.hits.hits;
        });
        this.location.go('browse/'+category);
        this.loading = false;
        return;
      }

}
