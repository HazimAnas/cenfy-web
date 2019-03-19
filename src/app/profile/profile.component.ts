import { Component, OnInit } from '@angular/core';
import { UserService } from '../libs/services/user.service';
import { User } from '../libs/models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user : User;

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.userService.getUser().pipe(first()).subscribe(result => {
            this.user = result.data;
    });
  }

}
