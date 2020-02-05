import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tag, DashboardTag } from '../core/domain/tag';

@Component({
  selector: 'app-modal-evaluate',
  templateUrl: './modal-evaluate.component.html',
  styleUrls: ['./modal-evaluate.component.scss']
})
export class ModalEvaluateComponent implements OnInit {

  @Input() tag: DashboardTag

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
