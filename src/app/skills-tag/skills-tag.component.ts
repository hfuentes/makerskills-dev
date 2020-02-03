import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'tags',
  templateUrl: './skills-tag.component.html',
  styleUrls: ['./skills-tag.component.css']
})
export class SkillsTagComponent implements OnInit {

  public checkboxGroupForm: FormGroup;
  forma: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  addUserView() {
    console.log("Pase por aquí ...")
    /*this.forma.reset({
      name: null,
      photoURL: null,
      roles: {admin: false, profile: true},
      active: true
    });*/
  }

}
