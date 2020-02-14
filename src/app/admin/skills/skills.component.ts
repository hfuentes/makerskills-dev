import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Skill } from '../../core/domain/skill';
import { SharedService } from '../../core/shared.service';
import {Error, LoadingPlace, Settings} from '../../error-handler/error-handler.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  loading = {
    skills: false,
    activarSkill: false,
    actualizarSkill: false
  };

  error = {
    skills: {},
    activarSkill: {},
    actualizarSkill: {}
  };

  formAddSkill: FormGroup;
  addSkill: boolean;
  public skillsFront: Array<any>;

  constructor(public sharedService: SharedService) {
    this.formAddSkill = new FormGroup(
      {
        skill: new FormControl(null, Validators.required)
      });

    this.formAddSkill = new FormGroup({
      name: new FormControl(null, Validators.required),
      activo: new FormControl(null, Validators.required),
      tags: new FormGroup(
        //this.dummy.forEach(user => {});
        {
          name: new FormControl(false),
          ref: new FormControl(true)
        }
      )
    });
  }


  ngOnInit() {
    this.loading.skills = true;
    this.error.skills = false;
    this.addSkill = false;
    this.sharedService.getSkills().then(skills => {
      this.skillsFront = skills;
      skills.forEach( skill => {
        skill.edit = false;
        skill.loading = false;
        skill.error = {};
      });

      this.loading.skills = false;
    }).catch(err => {
      this.error.skills = new Error('Error on loading skills, please try again.');
      this.loading.skills = false;
      console.error(err);

    });
  }

  viewAddSkillForm() {
    this.addSkill = !this.addSkill;
  }

  onClick(skill) {
    skill.active = !skill.active;
    skill.error = {};
    skill.loading = true;
    this.sharedService.editSkill(skill.id, {active: skill.active})
      .then(() => {
        skill.loading = false;
      })
      .catch(err => {
        skill.error = {
          status: 400,
          message: 'Servicio no disponible'
        };
        skill.loading = false;
      });
  }

}
