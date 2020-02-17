import { Component, OnInit } from '@angular/core';
import { SearchData } from '../users-search/users-search.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  search: SearchData = new SearchData()
  email = ''

  constructor() { }

  ngOnInit() {
  }

}
