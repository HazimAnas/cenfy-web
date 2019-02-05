import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../libs/models/user';
//import { AuthenticationService } from '../libs/services/authentication.service';
import { UserService } from '../libs/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(results => {
            this.users = results.data;
    });
  }

}
