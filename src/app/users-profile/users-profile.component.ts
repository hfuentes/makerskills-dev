import { Component, OnInit, Input } from '@angular/core';
import { SearchData } from '../users-search/users-search.component';
import { User } from '../core/domain/user';
import { AuthService } from '../core/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html'
})
export class UsersProfileComponent implements OnInit {

  user: User = null
  search: SearchData = new SearchData()

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    console.log(this.router.getCurrentNavigation().extras.state)
    if (!this.user) this.user = this.auth.userData
  }

  ngOnInit() {
    const data = this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation().extras.state)
    )
  }

}
