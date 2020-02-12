import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ModalCommentComponent } from '../modal-comment/modal-comment.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-btn-comment',
  templateUrl: './btn-comment.component.html',
  styleUrls: ['./btn-comment.component.scss']
})
export class BtnCommentComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() { }

  isVisible() {
    const isValidURL =
      this.router.url.indexOf('dashboard') > -1 ||
      this.router.url.indexOf('/profile') > -1
    return this.auth && this.auth.userData !== null && isValidURL
  }

  openCommentModal() {
    this.modalService.open(ModalCommentComponent)
  }

}
