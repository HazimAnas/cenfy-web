import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
    });
  }

  //email = new FormControl('', [Validators.required, Validators.email]);
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  getErrorMessage() {
    return this.f.email.hasError('required') ? 'You must enter a value' :
        this.f.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.router.navigate(['/login']);
  }
}
