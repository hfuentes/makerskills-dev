import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  doLogout() {
    this.authService
      .doLogout()
      .then(res => this.router.navigate(['/login']))
      .catch(err => console.error(err))
  }

}
