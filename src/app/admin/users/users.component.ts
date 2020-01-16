import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../core/shared.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  private users: Array<any>;
  private loading: boolean;
  private error: any;

  ngOnInit() {
    this.loading = true;
    this.sharedService.getUsers().then(users => {
      this.loading = false;
      this.users = users;
      console.log(this.users);
    }).catch(err => {
      console.error(err);
      this.loading = false;
      this.error = {
        status: 400,
        message: 'Servicio no disponible'
      };
    });
  }

}
