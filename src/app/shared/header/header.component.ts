import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthenticationService } from '../../libs/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
title = 'Servpod';
isLoggedIn = this.authenticationService.isLoggedIn();
@Output() public sidenavToggle = new EventEmitter();
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authenticationService.logout();
  }

}
