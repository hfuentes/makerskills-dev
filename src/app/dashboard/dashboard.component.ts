import { Component, OnInit } from '@angular/core';
import { User } from '../core/domain/user';
import { SearchData } from '../search/search.component';
import { Settings, LoadingStyle, LoadingType, LoadingPlace } from '../loading/loading.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  search: SearchData = new SearchData()

  constructor() { }

  ngOnInit() {
  }

}
