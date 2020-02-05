import { Component, OnInit } from '@angular/core'
import { AuthService } from '../core/auth.service'
import { NavbarMenuConstants } from '../constants/navbar-menu.constants'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  MENU = this.navbarConst.getMenuItems();

  constructor(public auth: AuthService, public navbarConst: NavbarMenuConstants) {
  }

  ngOnInit() {
  }

}
