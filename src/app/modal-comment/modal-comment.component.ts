import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { SharedService } from '../core/shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommentForm } from '../core/domain/comment';
import { Error } from '../error-handler/error-handler.component';

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.scss']
})
export class ModalCommentComponent implements OnInit {

  state = {
    loading: false,
    error: null,
    success: false
  }

  form: FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    private auth: AuthService,
    private shared: SharedService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      text: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  saveComment() {
    if (this.form.valid) {
      this.state.loading = true
      this.state.error = null
      this.shared.saveComment(new CommentForm({
        user: this.auth.userData,
        comment: this.form.controls.text.value
      })).then(() => {
        this.state.loading = false
        this.state.success = true
      }).catch(err => {
        this.state.loading = false
        this.state.error = new Error()
        console.error(err)
      })
    }
  }

}
