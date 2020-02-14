import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../core/shared.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserAdminItem } from 'src/app/core/domain/user';
import { Error } from 'src/app/error-handler/error-handler.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // users list
  users: Array<UserAdminItem> = []

  // users list state
  state = {
    loading: false,
    error: null
  }

  create = {
    active: false,
    form: new FormGroup({}),
    state: {
      loading: false,
      error: null,
      success: false
    }
  }

  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {
    this.initCreateForm()
  }

  cancel() {
    this.create.active = false
    this.create.state.success = false
    this.initCreateForm()
  }

  initCreateForm() {
    this.create.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl(''),
      active: new FormControl(true),
      roleAdmin: new FormControl(false),
      roleProfile: new FormControl(true),
      roleSearcher: new FormControl(false)
    })
  }

  ngOnInit() {
    this.state.error = null
    this.state.loading = true
    this.sharedService.getUsers().then(users => {
      this.users = users.map(user => new UserAdminItem({ user }))
      this.state.loading = false
    }).catch(err => {
      this.state.loading = false
      this.state.error = new Error()
      console.error(err)
    })
  }

  setActive(item: UserAdminItem) {
    item.state.activeError = null
    item.state.activeLoading = true
    this.sharedService.editUser(item.user, { active: !item.user.active }).then(() => {
      item.user.active = !item.user.active
      item.state.activeLoading = false
    }).catch(err => {
      item.state.activeLoading = false
      item.state.activeError = new Error()
      console.error(err)
    })
  }

  setRoles(item: UserAdminItem, role: string) {
    item.state.rolesLoading = true
    item.state.rolesError = null
    const roles = item.user.roles
    roles[role] = !roles[role]
    this.sharedService.editUser(item.user, { roles }).then(() => {
      item.user.roles = roles
      item.state.rolesLoading = false
    }).catch(err => {
      item.state.rolesLoading = false
      item.state.rolesError = new Error()
      console.error(err)
    })
  }

  saveUser() {
    if (this.create.form.valid) {
      this.create.state.success = false
      this.create.state.loading = true
      this.create.state.error = null
      const newUser = new User({
        email: this.create.form.controls.email.value,
        displayName: this.create.form.controls.name.value,
        active: this.create.form.controls.active.value,
        roles: {
          admin: this.create.form.controls.roleAdmin.value,
          profile: this.create.form.controls.roleProfile.value,
          searcher: this.create.form.controls.roleSearcher.value
        }
      })
      this.sharedService.addUser(newUser).then(() => {
        this.users.unshift(new UserAdminItem({ user: newUser }))
        this.create.state.loading = false
        this.create.state.success = true
      }).catch(err => {
        this.create.state.loading = false
        this.create.state.error = err && err.type === 'user-exists' ?
          new Error('Ups! The user you are trying to create already exists') : new Error()
        console.error(err)
      })
    }
  }
}
