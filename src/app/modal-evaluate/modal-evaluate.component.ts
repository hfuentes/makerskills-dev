import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardTag, NavSearchItem } from '../core/domain/tag';
import { SharedService } from '../core/shared.service';
import { EvaluationSkill, Skill, SkillName } from '../core/domain/skill';
import { User, UserItemsSearch } from '../core/domain/user';
import { UserService } from '../core/user.service';
import { Error } from '../error-handler/error-handler.component';

@Component({
  selector: 'app-modal-evaluate',
  templateUrl: './modal-evaluate.component.html',
  styleUrls: ['./modal-evaluate.component.scss']
})
export class ModalEvaluateComponent implements OnInit {

  @Input() tag: DashboardTag
  @Input() userSkills: Array<Skill>
  @Input() user: User
  @Output() reloadUserSkills = new EventEmitter()

  evaluationSkills: Array<EvaluationSkill> = []
  usersReferents: Array<UserItemsSearch> = []

  state: any = {
    loading: false,
    error: null,
    saveLoading: false,
    saveError: null,
    refLoading: false,
    refError: null
  }

  constructor(
    public activeModal: NgbActiveModal,
    private sharedService: SharedService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.state.loading = true
    this.state.error = null
    this.sharedService.getSkillsByTag(this.tag.tag).then(data => {
      this.evaluationSkills = []
      if (data && data.length) {
        data.forEach(skill => {
          this.evaluationSkills.push(this.getEvaluationSkill(skill))
        })
        this.evaluationSkills.sort(this.compareEvaluationSkills)
      }
      this.state.loading = false
    }).catch(err => {
      this.state.loading = false
      this.state.error = new Error()
      console.error(err)
    })

    this.state.refLoading = true
    this.state.refError = null
    const tags = Array<NavSearchItem>()
    tags.push(new NavSearchItem({ tag: this.tag.tag }))
    this.sharedService.getUsersBySearchItem(tags).then(data => {
      this.usersReferents = data.slice(0, 5)
      this.state.refLoading = false
    }).catch(err => {
      this.state.refLoading = false
      this.state.refError = new Error()
      console.error(err)
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
    if (userSkill) return new EvaluationSkill({ skill: userSkill })
    else {
      return new EvaluationSkill({
        skill: new Skill({
          name: skill.name,
          exp: null,
          level: null,
          ref: this.sharedService.getSkillRef(skill.id),
          tags: skill.tags
        })
      })
    }
  }

  saveEvaluation() {
    this.state.saveLoading = true
    this.state.saveError = null
    const removeIds = this.evaluationSkills.filter(x => !x.check).map(x => x.skill.ref.id)
    this.userSkills = this.userSkills.filter(x => {
      return !removeIds.includes(x.ref.id)
    })
    this.evaluationSkills.filter(x => x.check).forEach(x => {
      const exist = this.userSkills.find(y => y.ref.id === x.skill.ref.id)
      if (!exist) this.userSkills.push(new Skill({ ...x.skill}))
    })
    this.userService.setSkills(this.user, this.userSkills).then(() => {
      this.state.saveLoading = false
      this.evaluationSkills.sort(this.compareEvaluationSkills)
      this.reloadUserSkills.emit(this.userSkills)
    }).catch(err => {
      this.state.saveLoading = false
      this.state.saveError = new Error()
      console.error(err)
    })

  }

  resetEvaluationSkill(evaluationSkill: EvaluationSkill) {
    evaluationSkill.skill.exp = null
    evaluationSkill.skill.level = null
  }

}
