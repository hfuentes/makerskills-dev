import { Component, OnInit } from '@angular/core';
import { Comment } from '../core/domain/comment';
import { SharedService } from '../core/shared.service';
import { SeedService } from '../core/seed.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: Array<Comment> = []
  state = {
    loading: false,
    error: null
  }

  constructor(
    private sharedService: SharedService,
    private seedService: SeedService
  ) { }

  ngOnInit() {
    this.seedService.populate()
    this.state.loading = true
    this.sharedService.getComments().then(data => {
      this.comments = data
      this.state.loading = false
    }).catch(err => console.error(err))
  }

}
