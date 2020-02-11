import { Component, OnInit } from '@angular/core';
import { SearchData } from '../users-search/users-search.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html'
})
export class UsersProfileComponent implements OnInit {

  email = ''
  search: SearchData = new SearchData()

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    // get email in params
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.email) this.email = params.email
    })
  }

  ngOnInit() { }

}
