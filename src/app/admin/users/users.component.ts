import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../core/shared.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/domain/user';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public checkboxGroupForm: FormGroup;

  forma: FormGroup;
  addUser: boolean;

  constructor(
    public sharedService: SharedService,
    private formBuilder: FormBuilder) {
      this.forma = new FormGroup({
        'email': new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
        ]
        ),
        'name': new FormControl(null,
          Validators.required
        ),
        'activa': new FormControl(true),
        'roles': new FormGroup({
          'admin': new FormControl(false),
          'profile': new FormControl(true)
        })
      });
    }

  public usersFront: Array<UserFront>;
  public users: Array<User>;

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
    this.addUser = false;
    this.usersFront = [];
    this.loadingGetUsers.loading = true;
    this.sharedService.getUsers().then(users => {
      this.loadingGetUsers.loading = false;
      this.users = users;
      users.forEach(user => {

        let userFront = new UserFront();

        userFront.user = user;

        userFront.checkboxGroupForm = this.formBuilder.group({
          profile: user.roles.profile,
          admin: user.roles.admin
        });

        this.usersFront.push(userFront);
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

  onClick(userFront){
    if(userFront.user.active){
      userFront.user.active = false;
    }else{
      userFront.user.active = true;
    }

    userFront.user.loadingUpdateUser = true;
    this.sharedService.editUser(userFront.user.email, {active: userFront.user.active})
    .then(() => {
      userFront.user.loadingUpdateUser = false;
    })
    .catch(err => {
      userFront.user.loadingUpdateUser = false;
      this.loadingUpdateUser.error = {
        status: 400,
        message: 'Servicio no disponible'
      };
    });
  }

  onClickRole(userFront, role){
    let loading = role + 'RoleUserLoading';
    userFront.user[loading] = true;

    if(userFront.user.roles[role] === true){
      userFront.user.roles[role] = false;
    }else{
      userFront.user.roles[role] = true;
    }

    this.sharedService.editUser(userFront.user.email, {roles: userFront.user.roles})
    .then(() => {
      userFront.user[loading] = false;
    })
    .catch(err => {
      userFront.user[loading] = false;
    });
  }

  guardarUsuario(){
    console.log(this.forma.value);

    let usuarioGuardar: User = {
      displayName: this.forma.value.name,
      roles: this.forma.value.roles,
      active: true
    };
    console.log(usuarioGuardar);
    console.log(this.forma.value.email);
    this.sharedService.addUser(this.forma.value.email, usuarioGuardar).then()
    .catch(err => {
      console.error(err);
    });
  }

  addUserView(){
    this.forma.reset({
      name: null,
      photoURL: null,
      roles: {admin: false, profile: true},
      active: true
    });
    if (this.addUser) {
      this.addUser = false;
    } else {
      this.addUser = true;
    }
  }
}

export class UserFront {
  user: User;
  checkboxGroupForm: any;

  constructor() {}
}
