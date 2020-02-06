import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Skill } from '../../core/domain/skill';
import { SharedService } from '../../core/shared.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  addSkill: boolean;
  formAddSkill: FormGroup;
  indexSelected: number = null;
  public skillsFront: Array<any>;
  public skills: Array<Skill>;

  viewEdit: boolean;
  formEditSkill: FormGroup;
  dummy: [any];

  constructor(public sharedService: SharedService) {
    this.formAddSkill = new FormGroup(
    {
      'skill': new FormControl(null, Validators.required)
    });

    this.formAddSkill = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'activo': new FormControl(null, Validators.required),
      'tags': new FormGroup(
        //this.dummy.forEach(user => {});
        {
          'name': new FormControl(false),
          'ref': new FormControl(true)
        }
      )
    });
  }

  ngOnInit() {
    this.addSkill = false;
    this.sharedService.getAllSkills().then(skills => {
      console.log(skills);
      this.skills = skills;
      skills.forEach( skill => {
        skill.viewEdit = false;
      });
    }).catch(err => {
      console.error(err);

    });
  }

  guardarSkill() {

  }

  viewAddSkill() {
    this.addSkill = !this.addSkill;
  }


  skillActiveEdit(index, skill) {
    skill.viewEdit = !skill.viewEdit;
    this.indexSelected = index;
    console.log(this.viewEdit);
    console.log(this.indexSelected);
  }

}
