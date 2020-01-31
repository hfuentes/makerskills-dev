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
  addUser: boolean;

  constructor(
    
    private formBuilder: FormBuilder) {
      this.forma = new FormGroup({
        'email': new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
        ]
        ),
        'name': new FormControl(null,
          Validators.required
        ),
        'activa': new FormControl(true),
        'roles': new FormGroup({
          'admin': new FormControl(false),
          'profile': new FormControl(true)
        })
      });
    }

  ngOnInit() {
    this.addUser = false;
  }

  addUserView() {
    console.log("aqui estoy !")
    this.forma.reset({
      name: null,
      photoURL: null,
      roles: {admin: false, profile: true},
      active: true
    });
    if (this.addUser) {
      this.addUser = false;
    } else {
      this.addUser = true;
    }
  }

}
