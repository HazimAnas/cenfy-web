import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceProvider } from '../libs/models/service-provider';
//import { AuthenticationService } from '../libs/services/authentication.service';
import { ServiceProviderService } from '../libs/services/sp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  serviceProviders: ServiceProvider[] = [];
  breakpoint: number;
  panelOpenState = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit() {
    this.getServiceProvider();
    this.breakpoint = (window.innerWidth <= 1080) ? 3 : 5;

    this.searchForm = this.formBuilder.group({
            search: [''],
    });

    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/browse/all';
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1080) ? 3 : 5;
  }

  getServiceProvider() {
    this.serviceProviderService.getAll().pipe(first()).subscribe(results => {
            this.serviceProviders = results.data;
    });
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.searchForm.invalid) {
          return;
      }

      this.loading = true;

      this.router.navigate([this.returnUrl]);
    }

}
