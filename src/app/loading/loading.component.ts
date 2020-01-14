import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean;
  @Input() error: Error;
  constructor() { }

  ngOnInit() {
  }
}

export class Error {
  status:number;
  message:string;
}