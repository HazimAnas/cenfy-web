import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../libs/services/user.service';
import { ServiceProviderService } from '../libs/services/sp.service';
import { AuthenticationService } from '../libs/services/authentication.service';
import { User } from '../libs/models/user';
import { ServiceProvider } from '../libs/models/service-provider';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  spForm: FormGroup;
  user : User;
  serviceProvider: ServiceProvider;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private spService: ServiceProviderService,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.getUserData();

    this.profileForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: '',
            userName: ['', Validators.required],
            displayName: ['', Validators.required],
            address: ['', Validators.required],
            phoneNumber: ['', Validators.required]
    });

    this.spForm = this.formBuilder.group({
            displayName: ['', Validators.required],
            description: ['', Validators.required],
            categories: ''
    });
  }

  get f() { return this.profileForm.controls; }

  get g() { return this.spForm.controls; }

  getUserData(): void {

    this.userService.getUser().pipe(first()).subscribe( result => {
        this.user = result.data;
        this.profileForm
          .patchValue({
             email: this.user.email,
             userName: this.user.userName,
             displayName: this.user.displayName,
             address: this.user.address,
             phoneNumber: this.user.phoneNumber
           });
    });

    this.spService.getServiceProvider(this.authenticationService.currentUserValue.serviceProvider).pipe(
      first()).subscribe( result => {
        this.serviceProvider = result.data;
        if (this.serviceProvider) {
          this.spForm
            .patchValue({
              displayName: this.serviceProvider.displayName,
              description: this.serviceProvider.description,
              categories: this.serviceProvider.categories
            });
        }
      });
  }

   onSubmitUser() {

   }

   onSubmitSP() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.spForm.invalid) {
       return;
     }

     if(this.user.serviceProvider) {
     } else {
       this.spService.createSp(this.g.displayName.value, this.g.description.value, this.authenticationService.currentUserValue._id)
           .pipe(first())
           .subscribe(
               data => {
                     this.router.navigate(['/home']);
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });
     }

     this.loading = true;


   }

}
