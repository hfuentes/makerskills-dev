import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../core/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../core/domain/user';
import { Error, ErrorType } from '../error-handler/error-handler.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html'
})
export class UsersSearchComponent implements OnInit {

  @Input() search: SearchData
  form: FormGroup

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email])
    })
  }

  ngOnInit() { }

  findMySelf() {
    this.form.reset()
    this.search.key = this.auth.userData.email
    this.search.loading = true
    this.search.user = null
    this.search.error = null
    this.userService.getUserByEmail(this.auth.userData.email).then(user => {
      if (user) {
        this.search.user = user
      } else {
        this.search.error = new Error('Ups! The user you are looking for seems not to be in the records.', ErrorType.warning)
      }
      this.search.loading = false
    }).catch(err => {
      console.error(err)
      this.search.loading = false
      this.search.error = new Error('Ups! An error occurred while searching, please try again.')
    })
  }

  searchUser() {
    if (this.form.valid) {
      this.search.key = this.form.controls.email.value
      this.search.loading = true
      this.search.user = null
      this.search.error = null
      this.userService.getUserByEmail(this.form.controls.email.value).then(user => {
        if (user) {
          this.search.user = user
        } else {
          this.search.error = new Error('Ups! The user you are looking for seems not to be in the records.', ErrorType.warning)
        }
        this.search.loading = false
      }).catch(err => {
        console.error(err)
        this.search.loading = false
        this.search.error = new Error('Ups! An error occurred while searching, please try again.')
      })
    }
  }
}

export class SearchData {
  key: string
  loading = false
  user: User = null
  error: Error = null
}
