import { Component, OnInit } from '@angular/core'
import { SkillService } from '../core/skill.service'
import { Skill, Skill2 } from '../core/domain/skill'
import { UserService } from '../core/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  public skills: [Skill]
  public skills2: [Skill2]
  public agregar: boolean
  habilidadSeleccionada: string
  experienciaSeleccionada: string
  nivelSeleccionado: string

  constructor(public skillService: SkillService, public userService: UserService) {
    this.skills = [{ habilidad: "algo", experiencia: "3", nivel: "Junior" }];
  }

  ngOnInit() {
    /**************/
    this.skillService.getSkills().then(names => {
      const skillsNames = names
      console.log(skillsNames)
    }).catch(err => console.error(err))
    /**************/

    this.userService.getSkills('hector.fuentes@imagemaker.com')
    .then(res => this.skills2 = res)
    .catch(err => console.error(err))

    this.skills.push({ habilidad: "algo2", experiencia: "3", nivel: "Junior" });
  }

  addItem(): void {
    this.agregar = false;
    this.skills.push({ habilidad: this.habilidadSeleccionada, experiencia: this.experienciaSeleccionada, nivel: this.nivelSeleccionado });
  }

  cancelAddItem(): void {
    this.agregar = false;
  }

  selectChangeHandler(event: any) {
    //update the ui
    switch (event.target.name) {
      case "inputGroupSelectHabilidad":
        this.habilidadSeleccionada = event.target.value;
        break;
      case "inputGroupSelectExperiencia":
        this.experienciaSeleccionada = event.target.value;
        break;
      case "inputGroupSelectNivel":
        this.nivelSeleccionado = event.target.value;
        break;
    }


  }

}
