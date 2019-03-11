import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../libs/services/authentication.service';
import { User } from '../../libs/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
title = 'cenfy-web';
isLoggedIn = this.authenticationService.isLoggedIn();

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

  }

  onLogout(){
    this.authenticationService.logout();
  }

}
