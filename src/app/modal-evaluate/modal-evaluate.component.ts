import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tag, DashboardTag } from '../core/domain/tag';
import { SharedService } from '../core/shared.service';
import { EvaluationSkill, Skill, SkillName } from '../core/domain/skill';

@Component({
  selector: 'app-modal-evaluate',
  templateUrl: './modal-evaluate.component.html',
  styleUrls: ['./modal-evaluate.component.scss']
})
export class ModalEvaluateComponent implements OnInit {

  @Input() tag: DashboardTag
  @Input() userSkills: Array<Skill>

  evaluationSkills: Array<EvaluationSkill> = []

  state: any = {
    loading: false,
    error: null
  }

  constructor(
    private activeModal: NgbActiveModal,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.getSkillsByTag(this.tag.tag).then(data => {
      this.evaluationSkills = []
      if (data && data.length) {
        data.forEach(skill => {
          this.evaluationSkills.push(this.getEvaluationSkill(skill))
        })
        this.evaluationSkills.sort(this.compareEvaluationSkills)
      }
    })
  }

  compareEvaluationSkills(a: EvaluationSkill, b: EvaluationSkill) {
    return a.check === b.check ? 0 : a.check ? -1 : 1
  }

  compareTagsSort(x: DashboardTag, y: DashboardTag) {
    const xSkills = x.skills ? x.skills.length : 0
    const ySkills = y.skills ? y.skills.length : 0
    if (xSkills > ySkills) return -1
    if (xSkills < ySkills) return 1
    return 0
  }

  getEvaluationSkill(skill: SkillName): EvaluationSkill {
    const userSkill = this.userSkills && this.userSkills.length > 0 ? this.userSkills.find(x => x.ref.id === skill.id) : null
    console.log(userSkill)
    if (userSkill) return new EvaluationSkill({ skill: userSkill, check: true })
    else return new EvaluationSkill({ skill, check: false })
  }

  saveEvaluation() {
    alert('Funcionalidad en constracción')
  }

}
