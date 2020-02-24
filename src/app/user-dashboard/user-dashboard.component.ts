import { Component, OnInit } from '@angular/core';
import { SearchData } from '../users-search/users-search.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  search: SearchData = new SearchData()
  email = ''

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
