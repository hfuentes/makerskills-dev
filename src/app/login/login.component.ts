import { Component, OnInit, RootRenderer } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { Error } from '../error-handler/error-handler.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  status = {
    loading: false,
    error: null
  }

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() { }

  doGoogleAuth = () => {
    this.status.loading = true
    this.status.error = null
    this.auth.doGoogleLogin()
      .then(() => this.router.navigate(['profile'])).catch(err => {
        this.status.loading = false
        this.status.error = new Error('')
        if (err && err.code === 'auth/user-disabled') {
          this.status.error = new Error('Ops! Your account is disabled, please contact the administrator.')
        } else {
          this.status.error = new Error('Error trying to log in with Google, please try again later.')
        }
        this.status.loading = false
      }).catch(err => {
        this.status.loading = false
        this.status.error = new Error('Error trying to log in with Google, please try again later.')
        console.error(err)
      })
  }

  isVisible() {
    return !this.auth.authenticated
  }
}
