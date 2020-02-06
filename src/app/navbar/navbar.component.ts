import { Component, OnInit } from '@angular/core'
import { AuthService } from '../core/auth.service'
import { NavbarConstants } from './navbar.constants'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  MENU = this.navbarConst.getMenuItems();
  avatar = localStorage.getItem('photoURL');

  constructor(public auth: AuthService, public navbarConst: NavbarConstants) {
  }

  ngOnInit() {
  }

}
