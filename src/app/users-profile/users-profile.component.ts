import { Component, OnInit } from '@angular/core';
import { SearchData } from '../users-search/users-search.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html'
})
export class UsersProfileComponent implements OnInit {

  // user email in parameters
  email = ''

  // to pass state loading
  search: SearchData = new SearchData()

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) {
    // get email in params .. only for searchers users
    if (this.auth.matchingRoles(['searcher'])) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params.email) this.email = params.email
      })
    }
  }

  ngOnInit() { }

}
