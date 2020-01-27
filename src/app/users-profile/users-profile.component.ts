import { Component, OnInit } from '@angular/core';
import { SearchData } from '../users-search/users-search.component';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html'
})
export class UsersProfileComponent implements OnInit {

  search: SearchData = new SearchData()

  constructor() { }

  ngOnInit() {
  }

}
