import { Component, OnInit, Input } from '@angular/core'
import { SharedService } from '../core/shared.service'
import { Tag, DashboardTag } from '../core/domain/tag'
import { Error } from '../error-handler/error-handler.component'
import { Skill } from '../core/domain/skill'
import { UserService } from '../core/user.service'
import { User } from '../core/domain/user'
import { AuthService } from '../core/auth.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ModalEvaluateComponent } from '../modal-evaluate/modal-evaluate.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // user data
  @Input() user: User

  // tags data
  tags = new Array<DashboardTag>()
  tagsNames = new Array<Tag>()

  // user skills data
  skills = new Array<Skill>()

  // state
  state = {
    loading: false,
    error: null
  }

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.setUser()
    this.loadData()
  }

  setUser(): void {
    if (!this.user) this.user = this.auth.userData
  }

  loadData() {
    this.state.loading = true
    this.state.error = null
    this.userService.getSkills(this.user).then(data => {
      this.skills = data
      return this.sharedService.getTags()
    }).then(data => {
      if (data && data.length > 0) {
        this.tagsNames = data
        this.tags = this.tagsNames.map(tag => new DashboardTag({
          tag,
          skills: this.getSkillsByTag(tag)
        })).sort(this.compareTagsSort)
        this.tags.forEach(t => t.setBg())
      }
      this.state.loading = false
    }).catch(err => {
      this.tags = []
      this.state.error = new Error()
      this.state.loading = false
      console.error(err)
    })
  }

  reloadData(data: Array<Skill>) {
    this.state.loading = true
    this.state.error = null
    this.skills = data
    this.tags = this.tagsNames.map(tag => new DashboardTag({
      tag,
      skills: this.getSkillsByTag(tag)
    })).sort(this.compareTagsSort)
    this.tags.forEach(t => t.setBg())
    window.scrollTo(0, 0)
    this.state.loading = false
  }

  getSkillsByTag(tag: Tag) {
    return this.skills.filter(skill => skill.tags && skill.tags.some(skillTag => skillTag.ref.id === tag.id))
  }

  compareTagsSort(x: DashboardTag, y: DashboardTag) {
    const xSkills = x.skills ? x.skills.length : 0
    const ySkills = y.skills ? y.skills.length : 0
    if (xSkills > ySkills) return -1
    if (xSkills < ySkills) return 1
    return 0
  }

  evaluateModal(tag: DashboardTag) {
    const modalEvaluateRef = this.modalService.open(ModalEvaluateComponent, { size: 'lg' })
    modalEvaluateRef.componentInstance.tag = tag
    modalEvaluateRef.componentInstance.userSkills = this.skills
    modalEvaluateRef.componentInstance.user = this.user
    modalEvaluateRef.componentInstance.reloadUserSkills.subscribe($e => this.reloadData($e))
  }

  deleteConfirm(tag: Tag) {
    alert('Funcionalidad por hacer ...')
  }

}
