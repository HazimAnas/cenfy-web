import { Component, OnInit } from '@angular/core';
import { UserService } from '../libs/services/user.service';
import { User } from '../libs/models/user';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.getUserData();

    this.profileForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: '',
            username: ['', Validators.required],
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
       username: this.user.username,
       displayName: this.user.displayName,
       address: this.user.address,
       phoneNumber: this.user.phoneNumber
     })
   }

   onSubmit() {
   }

}
