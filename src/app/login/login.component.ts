import { Component, OnInit, RootRenderer } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  error: string = undefined

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {}

  doGoogleAuth = () => {
    this.error = undefined
    this.auth.doGoogleLogin()
      .then(() => this.router.navigate(['profile'])).catch(err => {
        if (err && err.code == 'auth/user-disabled') {
          this.error = 'Ops! Your account is disabled, please contact the administrator.'
        } else {
          this.error = 'Error trying to log in with Google, please try again later.'
        }
      })
  }

  isVisible() {
    return !this.auth.authenticated
  }
}
