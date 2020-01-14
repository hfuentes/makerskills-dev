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
  public agregar: boolean;
  public skillsNames: any;
  habilidadSeleccionada: string;
  experienciaSeleccionada: string;
  nivelSeleccionado: string;
  public skills2: [Skill2]


  constructor(public skillService: SkillService, public userService: UserService) {
    this.skills = [{ habilidad: "algo", experiencia: "3", nivel: "Junior" }];
  }

  ngOnInit() {
    /**************/
    this.skillService.getSkills().then(names => {
      this.skillsNames = names;
      console.log(this.skillsNames)
    }).catch(err => console.error(err));
    /**************/

    this.userService.getSkills('hector.fuentes@imagemaker.com')
    .then(res => this.skills2 = res)
    .catch(err => console.error(err))

    this.skills.push({ habilidad: "algo2", experiencia: "3", nivel: "Junior" });
  }

  addItem(): void {
    this.agregar = false;
    console.log(!this.habilidadSeleccionada ? 'true' : 'false')
    if (!this.habilidadSeleccionada || this.habilidadSeleccionada === '' || 
    !this.experienciaSeleccionada || this.experienciaSeleccionada === '' || 
    !this.nivelSeleccionado || this.nivelSeleccionado === '') {
      console.log('Campos Vacios revisar');
    }
    else {
      this.skills.push({ habilidad: this.habilidadSeleccionada, experiencia: this.experienciaSeleccionada, nivel: this.nivelSeleccionado });
      this.habilidadSeleccionada = '';
      this.experienciaSeleccionada = '';
      this.nivelSeleccionado = '';
    }

  }

  cancelAddItem(): void {
    //controlar campos con datos
    this.agregar = false;
    this.habilidadSeleccionada = '';
    this.experienciaSeleccionada = '';
    this.nivelSeleccionado = '';
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
