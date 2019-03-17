import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService } from '../../libs/services/authentication.service';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isLoggedIn = this.authenticationService.isLoggedIn();
  @ViewChild('sidenav') sidenav: MatSidenav;
  @Output() sidenavClose = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) { }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  ngOnInit() {
  }

}
