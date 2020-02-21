import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Tag, NavSearchItem } from '../core/domain/tag';
import { SharedService } from '../core/shared.service';
import { UserItemsSearch } from '../core/domain/user';
import { Error } from '../error-handler/error-handler.component';
import { Skill } from '../core/domain/skill';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss']
})
export class NavbarSearchComponent implements OnInit {

  // tags data
  tags: Array<Tag> = []

  // skills data
  skills: Array<Skill> = []

  // search data
  search = {
    form: new FormGroup({}),
    usersItems: new Array<UserItemsSearch>(),
    items: new Array<NavSearchItem>(),
    itemState: {
      loading: false,
      error: null,
      settings: null
    },
    userState: {
      loading: false,
      error: null,
      settings: null
    }
  }

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private sharedServices: SharedService
  ) {
    this.search.form = this.formBuilder.group({
      text: new FormControl('')
    })
  }

  ngOnInit() {
    this.search.itemState.loading = true
    this.search.itemState.error = null
    // get skills
    this.sharedServices.getSkills().then(skills => {
      this.skills = skills
      //get tags
      return this.sharedServices.getTags()
    }).then(tags => {
      this.tags = tags
      this.search.itemState.loading = false
      this.search.form.controls.text.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((text: string) => text.toLocaleLowerCase().trim().split(',').map(x => x.trim()).filter(x => x))
      ).subscribe(searchItems => {
        this.search.items  = []
        searchItems.forEach(item => {
          const tag = this.tags.find(x => item.indexOf(x.name.trim().toLocaleLowerCase()) > -1)
          const skill = this.skills.find(x => item === x.name.trim().toLocaleLowerCase())
          if (tag || skill) this.search.items.push(new NavSearchItem({ item: tag || skill }))
        })
        if (this.search.items && this.search.items.length > 0) {
          // autogenerate weights - same weight for all items in search
          this.search.items.forEach(x => x.weight = 1 / this.search.items.length)
          // ... like average
          this.search.userState.loading = true
          this.search.userState.error = null
          this.sharedServices.getUsersBySearchItem(this.search.items).then(data => {
            this.search.userState.loading = false
            this.search.usersItems = data
          }).catch(err => {
            this.search.userState.loading = false
            this.search.userState.error = new Error()
            console.error(err)
          })
        }
      })
    }).catch(err => {
      this.search.itemState.loading = false
      this.search.itemState.error = new Error()
      console.error(err)
    })
  }

}
