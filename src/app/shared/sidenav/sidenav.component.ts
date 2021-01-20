import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService } from '../../libs/services/authentication.service';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoggedIn = this.authenticationService.isLoggedIn();
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  @Output() sidenavClose = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) { }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  ngOnInit() {
  }

}
