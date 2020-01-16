import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../core/shared.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getUsers().then(users => {
      console.log(users);
    }).catch(err => {
      console.error(err);
    });
  }

}
