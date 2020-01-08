import { Component, OnInit, RootRenderer } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  error = undefined

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  doGoogleAuth = () => {
    this.error = undefined
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/profile'])
        console.dir(res)
      }).catch(err => {
        if (err && err.code == 'auth/user-disabled') {
          this.error = 'Cuenta deshabilitada'
        } else {
          this.error = 'Error al intentar ingresar con Google'
        }
      })
  }
}
