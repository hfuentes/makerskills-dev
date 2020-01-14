import { Component, OnInit, ViewChild } from '@angular/core'
import { SkillService } from '../core/skill.service'
import { Skill, Skill2 } from '../core/domain/skill'
import { UserService } from '../core/user.service'
import { SkillsChartComponent } from '../skills-chart/skills-chart.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  public skills: [Skill];
  public skills2: [Skill2];
  public agregar: boolean;
  habilidadSeleccionada: string;
  experienciaSeleccionada: string;
  nivelSeleccionado: string;
  public loading: boolean;
  public error: object;

  @ViewChild('skillsChart', {static: true}) chart: SkillsChartComponent

  constructor(public skillService: SkillService, public userService: UserService) {
    this.skills = [{ habilidad: "algo", experiencia: "3", nivel: "Junior" }];
  }

  ngOnInit() {
    /**************/
    this.loading = true;
    this.skillService.getSkills().then(names => {
      this.loading = false;
      const skillsNames = names;
      console.log(skillsNames);
    }).catch(err => {
      console.error(err);
      this.loading = false;
      this.error = {status: 400, message: "Servicio no disponible"};
    });
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
