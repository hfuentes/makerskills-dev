import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../core/shared.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  public users: Array<any>;

  public loading: boolean;
  public error: any;

  loadingGetUsers = {
    loading: false,
    error: null
  };

  loadingAddUser = {
    loading: false,
    error: null
  };

  loadingUpdateUser = {
    error: null
  };

  ngOnInit() {
    this.loadingGetUsers.loading = true;
    this.sharedService.getUsers().then(users => {
      this.loadingGetUsers.loading = false;
      this.users = users;
      console.log(this.users);
    }).catch(err => {
      console.error(err);
      this.loadingGetUsers.loading = false;
      this.loadingGetUsers.error = {
        status: 400,
        message: 'Servicio no disponible'
      };
    });
  }

  onClick(user){
    if(user.active){
      user.active = false;
    }else{
      user.active = true;
    }

    user.loadingUpdateUser = true;
    this.sharedService.editUser(user.email, {active: user.active})
    .then(() => {
      user.loadingUpdateUser = false;
    })
    .catch(err => {
      user.loadingUpdateUser = false;
      this.loadingUpdateUser.error = {
        status: 400,
        message: 'Servicio no disponible'
      };
    });
  }

}
