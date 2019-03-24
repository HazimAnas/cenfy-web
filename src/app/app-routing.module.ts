import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './libs/guards/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'service-provider/:id', component: ServiceProviderComponent },
  { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
