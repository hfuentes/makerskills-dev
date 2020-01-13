import { Component, OnInit } from '@angular/core';
import { SkillService } from '../core/skill.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(public skillService: SkillService) { }

  ngOnInit() {
    this.skillService.getSkills()
  }

}
