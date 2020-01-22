import { ProfileService } from './../core/profile.service';
import { AuthService } from './../core/auth.service';
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core'
import { SharedService } from '../core/shared.service'
import { Skill } from '../core/domain/skill'
import { SkillsChartComponent } from '../skills-chart/skills-chart.component'
import { User } from '../core/domain/user';
import { Error } from '../error-handler/error-handler.component';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnChanges {

  @Input() user: User
  skills: Array<Skill>
  agregar: boolean
  skillsNames: any
  expsNames: any
  levelsNames: any
  habilidadSeleccionada: string
  experienciaSeleccionada: string
  nivelSeleccionado: string
  experienciaSeleccionadaValue: number
  nivelSeleccionadoValue: number
  loading: boolean
  error: any
  indexSelected: number = null
  chartConfig: any = { //chart config data
    drawLevels: true,
    drawExps: true
  }
  updateForm: FormGroup

  @ViewChild('skillsChart', { static: false }) chart: SkillsChartComponent

  constructor(
    private skillService: SharedService,
    private auth: AuthService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      exp: new FormControl(-1, [Validators.required, Validators.min(0), Validators.max(30)]),
      level: new FormControl(-1, [Validators.required, Validators.min(0), Validators.max(5)])
    })
  }

  ngOnInit() {

    this.loading = true
    this.skillService.getSkills().then(names => {
      this.skillsNames = names
      this.loading = false
    }).catch(() => {
      this.loading = false
    })

    this.loading = true
    this.skillService.getExps().then(names => {
      this.expsNames = names
      this.loading = false
    }).catch(() => {
      this.loading = false
    })

    this.loading = true
    this.skillService.getLevels().then(names => {
      this.levelsNames = names
      this.loading = false
    }).catch(() => {
      this.loading = false
    })

    this.loading = true
    if (!this.user) this.user = this.auth.userData
    this.profileService.getSkills(this.user).then(skills => {
      this.skills = skills
      this.loading = false
    }).catch(() => {
      this.error = new Error('Error on loading user skills, please try again.')
      this.loading = false
    })

  }

  ngOnChanges(): void {
    this.loading = true
    if (!this.user) this.user = this.auth.userData
    this.profileService.getSkills(this.user).then(skills => {
      this.skills = skills
      this.loading = false
    }).catch(() => {
      this.error = new Error('Error on loading user skills, please try again.')
      this.loading = false
    })
  }

  addItem(): void {
    /*let skill: Skill = new Skill()
    this.agregar = false
    console.log(!this.habilidadSeleccionada ? 'true' : 'false')
    if (!this.habilidadSeleccionada || this.habilidadSeleccionada === '' ||
      !this.experienciaSeleccionada || this.experienciaSeleccionada === '' ||
      !this.nivelSeleccionado || this.nivelSeleccionado === '') {
      console.log('Campos Vacios revisar')
    }
    else {
      skill = {
        name: this.habilidadSeleccionada,
        exp: {
          name: this.experienciaSeleccionada,
          value: this.experienciaSeleccionadaValue
        },
        level: {
          name: this.nivelSeleccionado,
          value: this.nivelSeleccionadoValue
        }
      }
      this.skills.push(skill)
      console.log(this.skills)
      this.habilidadSeleccionada = ''
      this.experienciaSeleccionada = ''
      this.nivelSeleccionado = ''
    }*/

  }

  cancelAddItem(): void {
    //controlar campos con datos
    this.agregar = false
    this.habilidadSeleccionada = ''
    this.experienciaSeleccionada = ''
    this.nivelSeleccionado = ''
  }

  selectChangeHandler(event: any) {
    //update the ui
    console.log(event)
    switch (event.target.name) {
      case "inputGroupSelectHabilidad":
        this.habilidadSeleccionada = event.target.value;
        break;
      case "inputGroupSelectExperiencia": {
        this.experienciaSeleccionada = event.target.selectedOptions[0].label;
        this.experienciaSeleccionadaValue = event.target.value;
        break;
      }
      case "inputGroupSelectNivel":
        this.nivelSeleccionado = event.target.selectedOptions[0].label;
        this.nivelSeleccionadoValue = event.target.value;
        break;
    }


  }

  deleteSkill(index: number): void {
    this.profileService.deleteSkill(this.skills[index], this.user)
    this.skills.splice(index, 1)
  }

  doCancelUpdateSkill(): void {
    this.indexSelected = null
    this.habilidadSeleccionada = ''
    this.nivelSeleccionado = ''
    this.experienciaSeleccionada = ''
  }

  showEditSkill(skill: Skill, index: number = null): void {
    this.updateForm.controls.exp.setValue(skill.exp)
    this.updateForm.controls.level.setValue(skill.level)
    this.indexSelected = index
  }

  doUpdateSkill(skill: Skill, index: number): void {
    if (this.updateForm.valid) {
      const tmp: Skill = {
        name: skill.name,
        exp: this.updateForm.controls.exp.value,
        level: this.updateForm.controls.level.value
      }
      this.profileService.updateSkill(tmp, this.user).then(() => {
        this.skills[index] = tmp
        this.updateForm.controls.exp.setValue(-1)
        this.updateForm.controls.level.setValue(-1)
        this.indexSelected = null
      }).catch(err => console.log(err))
    }
  }

}
