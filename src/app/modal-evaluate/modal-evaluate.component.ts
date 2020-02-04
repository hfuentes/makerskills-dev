import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tag } from '../core/domain/tag';

@Component({
  selector: 'app-modal-evaluate',
  templateUrl: './modal-evaluate.component.html',
  styleUrls: ['./modal-evaluate.component.scss']
})
export class ModalEvaluateComponent implements OnInit {

  @Input() tag: Tag

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
