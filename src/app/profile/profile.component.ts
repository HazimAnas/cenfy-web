import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../libs/services/user.service';
import { ServiceProviderService } from '../libs/services/sp.service';
import { AuthenticationService } from '../libs/services/authentication.service';
import { User } from '../libs/models/user';
import { ServiceProvider } from '../libs/models/service-provider';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first, mergeMap } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  categories : any = [] as unknown;
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
              description: this.serviceProvider.description
            });
          this.categories = this.serviceProvider.categories;
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

     if(this.serviceProvider) {
       this.spService.updateSp(this.serviceProvider._id, this.g.displayName.value, this.g.description.value, this.categories)
           .pipe(first())
           .subscribe(
               data => {
                     this.router.navigate(['/account/profile']);
                     this.loading = false;
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });

     this.spService.updateSp(this.serviceProvider._id, this.g.displayName.value, this.g.description.value, this.categories)
         .pipe(first())
         .subscribe(
             data => {
                   this.router.navigate(['/account/profile']);
                   this.loading = false;
             },
             error => {
                 this.error = error;
                 this.loading = false;
             });
   this.loading = true;
   } else {
       this.spService.createSp(this.g.displayName.value, this.g.description.value, this.categories, this.authenticationService.currentUserValue._id)
           .pipe(first())
           .subscribe(
               data => {
                     this.router.navigate(['/account/profile']);
                     this.serviceProvider = data;
                     this.loading = false;
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });
     }
     this.loading = true;
   }

   addCategory() {
     if( this.spForm.get('categories').value ) {
       this.categories.push({name : this.spForm.get('categories').value});
     }

   }

   removeCategory(i: number) {
     this.categories.splice(i, 1);
   }

   imageChangedEvent: any = '';
   croppedImage: any = '';
   base64croppedImage: any = '';

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.base64croppedImage = event.base64;
        this.croppedImage = this.convertDataUrlToFile(event.base64);

    }
    imageLoaded(image: HTMLImageElement) {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    uploadProfilePicture() {
      console.log(this.croppedImage);
      this.spService.uploadServiceProviderProfileImage(this.serviceProvider._id, this.croppedImage, 'profile')
      .subscribe(
          res => {
                console.log(res);
          },
          error => {
              console.log(error);
          });
    }

    convertDataUrlToBlob(dataUrl: any): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: `image/jpg`});
  }

  convertDataUrlToFile(dataUrl: any): File {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }

  let blob = new Blob([u8arr], {type: `image/jpg`});
  let file = new File([blob], this.serviceProvider.displayName + '.jpg', {type: `image/jpg`});
  console.log(file.name);
  return file;
}
}
