import { Component, OnInit } from '@angular/core';
import { UserService } from '../libs/services/user.service';
import { ServiceProviderService } from '../libs/services/sp.service';
import { User } from '../libs/models/user';
import { ServiceProvider } from '../libs/models/service-provider';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first, switchMap, tap, map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  spForm: FormGroup;
  user : User;
  serviceProvider: ServiceProvider;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private spService: ServiceProviderService
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
            displayName: ['', Validators.required]
    });
  }

  get f() { return this.profileForm.controls; }

  get g() { return this.profileForm.controls; }

  getUserData(): void {

    from(this.userService.getUser()).pipe(map( result => {
        this.user = result.data
    }),switchMap( result => <Observable<any>> this.spService.getServiceProvider(this.user.serviceProvider)),
    ).subscribe(result => {
              //set result to user data
              this.serviceProvider = result.data;
              //update form values
              this.setValues();
            });
  }

  setValues(): void {
  this.profileForm
    .patchValue({
       email: this.user.email,
       userName: this.user.userName,
       displayName: this.user.displayName,
       address: this.user.address,
       phoneNumber: this.user.phoneNumber
     });

  this.spForm
    .patchValue({
      displayName: this.serviceProvider.displayName
    });

   }

   onSubmit() {
   }

}
