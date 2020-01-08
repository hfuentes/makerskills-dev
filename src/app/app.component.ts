import { Component } from '@angular/core';
import { AuthService } from './core/auth.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService) { }

  get authenticated(): boolean {
    return this.authService.authenticated
  }

}
