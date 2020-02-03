import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Skill } from '../../core/domain/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  form: FormGroup;
  addSkill: boolean;


  constructor() {
    this.form = new FormGroup(
    {
      'skill': new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {

    this.addSkill = false;

  }

  guardarSkill() {

  }

  viewAddSkill() {
    this.addSkill = !this.addSkill;
  }

}
