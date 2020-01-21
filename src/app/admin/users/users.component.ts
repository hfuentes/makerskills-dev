import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../core/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../core/domain/user';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public checkboxGroupForm: FormGroup;

  constructor(
    public sharedService: SharedService,
    private formBuilder: FormBuilder) { }

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
      users.forEach(user => {
        /*user.checkboxGroupForm = this.formBuilder.group({
          profile: user.roles.profile,
          admin: user.roles.admin
        });
        console.log(user.checkboxGroupForm.value.admin);*/
      });

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

  onClickRole(user, role){
      if(user.roles[role] === true){
        user.roles[role] = false;
      }else{
        user.roles[role] = true;
      }

    this.sharedService.editUser(user.email, {roles: user.roles})
    .then(() => {

    })
    .catch(err => {
    });
  }
}
