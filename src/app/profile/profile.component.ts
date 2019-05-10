import { Component, OnInit } from '@angular/core';
import { UserService } from '../libs/services/user.service';
import { ServiceProviderService } from '../libs/services/sp.service';
import { User } from '../libs/models/user';
import { ServiceProvider } from '../libs/models/service-provider';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
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
  }

  get f() { return this.profileForm.controls; }

  getUserData(): void {
    this.userService.getUser().pipe(first()).subscribe(result => {
            //set result to user data
            this.user = result.data;
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
     })
   }

   onSubmit() {
   }

}
