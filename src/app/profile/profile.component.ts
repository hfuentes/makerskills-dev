import { ProfileService } from './../core/profile.service'
import { AuthService } from './../core/auth.service'
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core'
import { SharedService } from '../core/shared.service'
import { Skill, SkillName } from '../core/domain/skill'
import { SkillsChartComponent } from '../skills-chart/skills-chart.component'
import { User } from '../core/domain/user'
import { Error, Settings, LoadingPlace } from '../error-handler/error-handler.component'
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms'
import { Params } from '../core/domain/params'
import { ParamsService } from '../core/params.service'
import { UserService } from '../core/user.service'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, filter, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnChanges {

  @Input() user: User

  //skills
  skills: Array<Skill>
  indexSelected: number = -1

  // skills names data
  skillsNames: Array<SkillName>
  skillsNamesFiltered: Array<SkillName> = []

  // chart config data
  chartConfig: any = {
    drawLevels: true,
    drawExps: true
  }

  // params data
  params: Params

  // update controller data
  create = {
    form: new FormGroup({}),
    loading: false,
    error: null,
    settings: new Settings({ place: LoadingPlace.textLeft }),
    show: false
  }

  // update controller data
  update = {
    form: new FormGroup({}),
    loading: false,
    error: null,
    settings: new Settings({ place: LoadingPlace.textLeft })
  }

  //TODO
  agregar: boolean
  habilidadSeleccionada: string
  experienciaSeleccionada: string
  nivelSeleccionado: string
  experienciaSeleccionadaValue: number
  nivelSeleccionadoValue: number
  loading: boolean
  error: any

  //chart child element
  @ViewChild('skillsChart', { static: false }) chart: SkillsChartComponent

  constructor(
    private skillService: SharedService,
    private auth: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private paramsService: ParamsService,
    private userService: UserService,
    private sharedService: SharedService
  ) {
    this.update.form = this.formBuilder.group({})
    this.create.form = this.formBuilder.group({})
  }

  ngOnInit() {
    this.loading = true
    this.setUser() // set user src
    this.paramsService.getParams()
      .then(params => {
        this.params = params //get params data
        this.initUpdateForm()
        this.initCreateForm()
        return this.sharedService.getSkills()
      })
      .then(skillsNames => {
        this.skillsNames = skillsNames // get skills names
        return this.userService.getSkills(this.user)
      })
      .then(skills => {
        this.skills = skills
        this.loading = false
      })
      .catch(() => {
        this.error = new Error('Error on loading user skills, please try again.')
        this.loading = false
      })
  }

  initCreateForm() {
    this.create.form = this.formBuilder.group({ //set create form
      skillNameText: new FormControl(''),
      skillName: new FormControl(null, [
        Validators.required]),
      exp: new FormControl(1, [
        Validators.required,
        Validators.min(this.params.minExp),
        Validators.max(this.params.maxExp)]),
      level: new FormControl(1, [
        Validators.required,
        Validators.min(this.params.minLevel),
        Validators.max(this.params.maxLevel)])
    })
    this.create.form.controls.skillNameText.valueChanges.pipe(
      debounceTime(200)
    ).subscribe(text => {
      this.skillsNamesFiltered = text ?
        this.skillsNames.filter(skill => skill.name.toLowerCase().indexOf(text.toLowerCase()) > -1).slice(0, 10) : []
    })
  }

  initUpdateForm() {
    this.update.form = this.formBuilder.group({ //set update form
      exp: new FormControl(-1, [
        Validators.required,
        Validators.min(this.params.minExp),
        Validators.max(this.params.maxExp)]),
      level: new FormControl(-1, [
        Validators.required,
        Validators.min(this.params.minLevel),
        Validators.max(this.params.maxLevel)])
    })
  }

  ngOnChanges(): void {
    this.setUser()
    this.loading = true
    this.userService.getSkills(this.user).then(skills => {
      this.skills = skills
      this.loading = false
    }).catch(() => {
      this.error = new Error('Error on loading user skills, please try again.')
      this.loading = false
    })
  }

  setUser(): void {
    if (!this.user) this.user = this.auth.userData
  }

  //TODO cambiar esta funcion
  deleteSkill(index: number): void {
    this.profileService.deleteSkill(this.skills[index], this.user)
    this.skills.splice(index, 1)
  }

  doCancelUpdateSkill(): void {
    this.update.form.controls.exp.setValue(-1)
    this.update.form.controls.level.setValue(-1)
    this.indexSelected = null
    this.update.loading = false
    this.update.error = null
  }

  showEditSkill(skill: Skill, index: number = null): void {
    this.update.form.controls.exp.setValue(skill.exp)
    this.update.form.controls.level.setValue(skill.level)
    this.indexSelected = index
  }

  addSkillNameToForm(skillName: SkillName) {
    this.create.form.controls.skillName.setValue(skillName)
    this.skillsNamesFiltered = []
    this.create.form.controls.skillNameText.setValue('')
  }

  removeSkillNameToForm() {
    this.skillsNamesFiltered = []
    this.create.form.controls.skillNameText.setValue(this.create.form.controls.skillName.value.name)
    this.create.form.controls.skillName.setValue(null)
  }

  doCancelCreateSkill() {
    this.skillsNamesFiltered = []
    this.create.form.reset()
    this.create.show = false
  }

  doCreateSkill(): void {
    if (this.create.form.valid && !this.create.loading) {
      this.create.loading = true
      this.create.error = null
      let skillsIns: Array<Skill> = this.skills.map(x => x)
      let newSkill = new Skill()
      newSkill.exp = this.create.form.controls.exp.value
      newSkill.level = this.create.form.controls.level.value
      newSkill.name = this.create.form.controls.name.value
      newSkill.ref = this.sharedService.getSkillRef(this.create.form.controls.ref.value)
      skillsIns.unshift(newSkill)
      this.userService.setSkills(this.user, skillsIns).then(() => {
        this.skills = skillsIns
        this.create.form.controls.exp.setValue(1)
        this.create.form.controls.level.setValue(1)
        this.create.form.controls.name.setValue('')
        this.create.form.controls.ref.setValue('')
        this.create.loading = false
      }).catch(err => {
        this.create.loading = false
        this.create.error = new Error()
        console.log(err)
      })
    }
  }

  doUpdateSkill(skill: Skill): void {
    if (this.update.form.valid && !this.update.loading) {
      this.update.loading = true
      this.update.error = null
      let skillsUp: Array<Skill> = []
      for (const s of this.skills) {
        if (skill.ref.id == s.ref.id) {
          s.exp = this.update.form.controls.exp.value
          s.level = this.update.form.controls.level.value
        }
        skillsUp.push(s)
      }
      this.userService.setSkills(this.user, skillsUp).then(() => {
        this.update.form.controls.exp.setValue(-1)
        this.update.form.controls.level.setValue(-1)
        this.indexSelected = null
        this.skills = skillsUp
        this.update.loading = false
      }).catch(err => {
        this.update.loading = false
        this.update.error = new Error()
        console.log(err)
      })
    }
  }

}
