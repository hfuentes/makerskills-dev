import { Component, OnInit, Input } from '@angular/core'
import { SharedService } from '../core/shared.service'
import { Tag } from '../core/domain/tag'
import { Error } from '../error-handler/error-handler.component'
import { Skill } from '../core/domain/skill'
import { UserService } from '../core/user.service'
import { User } from '../core/domain/user'
import { AuthService } from '../core/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // tags data
  tags = new Array<Tag>()

  // user data
  @Input() user: User

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
    private auth: AuthService
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
    this.sharedService.getTags().then(data => {
      this.tags = data
      return this.userService.getSkills(this.user)
    }).then(data => {
      this.skills = data
      this.setTagSkills()
      this.state.loading = false
    }).catch(err => {
      this.tags = []
      this.state.error = new Error()
      this.state.loading = false
      console.error(err)
    })
  }

  setTagSkills() {
    this.tags.forEach(tag => {
      tag.skills = this.skills.filter(skill => skill.tags && skill.tags.some(skillTag => skillTag.ref.id === tag.id))
      tag.calcAvgLeveles()
    })
    this.tags.sort(this.compareTagsSort)
  }

  compareTagsSort(x: Tag, y: Tag) {
    const xSkills = x.skills ? x.skills.length : 0
    const ySkills = y.skills ? y.skills.length : 0
    if (xSkills > ySkills) return -1
    if (xSkills < ySkills) return 1
    return 0
  }

}
