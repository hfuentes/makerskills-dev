import { AuthService } from './../core/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core'
import { SkillService } from '../core/skill.service'
import { Skill } from '../core/domain/skill'
import { UserService } from '../core/user.service'
import { SkillsChartComponent } from '../skills-chart/skills-chart.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  skills: [Skill]
  agregar: boolean
  actualizar: boolean
  skillsNames: any
  habilidadSeleccionada: string
  experienciaSeleccionada: string
  nivelSeleccionado: string
  loading: boolean
  error: any
  indexSelected: number

  @ViewChild('skillsChart', { static: false }) chart: SkillsChartComponent

  constructor(
    public skillService: SkillService,
    public userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    /**************/

    this.skillService.getSkills().then(names => {
      this.skillsNames = names
      console.log(this.skillsNames)
    }).catch(err => console.error(err))
    /**************/

    this.loading = true
    this.userService.getSkills(this.auth.userData.email).then(skills => {
      this.skills = skills
      this.loading = false
    }).catch(err => {
      console.error(err)
      this.error = { message: 'Error on loading user skills, please try again.' }
      this.loading = false
    })
  }

  addItem(): void {
    let skill: Skill = new Skill()
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
          value: 1
        },
        level: {
          name: this.nivelSeleccionado,
          value: 2
        }
      }
      this.skills.push(skill)
      this.habilidadSeleccionada = ''
      this.experienciaSeleccionada = ''
      this.nivelSeleccionado = ''
      this.userService.addNewSkill(skill, this.auth.userData)
    }

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
    switch (event.target.name) {
      case "inputGroupSelectHabilidad":
        this.habilidadSeleccionada = event.target.value
        break
      case "inputGroupSelectExperiencia":
        this.experienciaSeleccionada = event.target.value
        break
      case "inputGroupSelectNivel":
        this.nivelSeleccionado = event.target.value
        break
    }


  }

  deleteSkill(index: number): void {
    this.userService.deleteSkill(this.skills[index], this.auth.userData)
    this.skills.splice(index, 1)
  }

  actualizarSkill(index: number): void {
    this.actualizar = true

  }

  ejecutarActualizarSkill(index: number): void {
    this.userService.updateSkill(this.skills[index], this.auth.userData)
    this.actualizar = false
  }

}
