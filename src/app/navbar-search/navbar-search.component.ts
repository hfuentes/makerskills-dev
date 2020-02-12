import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Tag, NavSearchTag } from '../core/domain/tag';
import { SharedService } from '../core/shared.service';
import { UserTagsSearch } from '../core/domain/user';
import { Error } from '../error-handler/error-handler.component';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss']
})
export class NavbarSearchComponent implements OnInit {

  // tags data
  tags: Array<Tag> = []

  // search data
  search = {
    form: new FormGroup({}),
    usersTag: new Array<UserTagsSearch>(),
    tags: new Array<NavSearchTag>(),
    tagState: {
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
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private sharedServices: SharedService
  ) {
    this.search.form = this.formBuilder.group({
      text: new FormControl('')
    })
  }

  ngOnInit() {
    this.search.tagState.loading = true
    this.search.tagState.error = null
    this.sharedServices.getTags().then(tags => {
      this.tags = tags
      this.search.tagState.loading = false
      this.search.form.controls.text.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((text: string) => text.toLocaleLowerCase().trim().split(',').map(x => x.trim()).filter(x => x))
      ).subscribe(searchTags => {
        this.search.tags = this.tags
          .filter(x => searchTags.indexOf(x.name.trim().toLocaleLowerCase()) > -1)
          .map(x => new NavSearchTag({ tag: x }))
        if (this.search.tags && this.search.tags.length > 0) {
          // autogenerate weights
          this.search.tags.forEach(x => x.weight = 1 / this.search.tags.length)
          // ... like average
          this.search.userState.loading = true
          this.search.userState.error = null
          this.sharedServices.getUsersByTag(this.search.tags).then(data => {
            this.search.userState.loading = false
            this.search.usersTag = data
          }).catch(err => {
            this.search.userState.loading = false
            this.search.userState.error = new Error()
            console.error(err)
          })
        }
      })
    }).catch(err => {
      this.search.tagState.loading = false
      this.search.tagState.error = new Error()
      console.error(err)
    })
  }

}
