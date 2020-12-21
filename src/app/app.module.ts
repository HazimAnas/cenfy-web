import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppConfigModule } from './app-config.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './material.module';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ImageCropperModule } from 'ngx-image-cropper';

import{ JwtInterceptor } from './libs/utils/jwt.interceptor';
import { ErrorInterceptor } from './libs/utils/error.interceptor';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { BrowseComponent } from './browse/browse.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SidenavComponent,
    ServiceProviderComponent,
    BrowseComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatFileUploadModule,
    ImageCropperModule,
    CustomMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppConfigModule
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
