import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Tag } from '../core/domain/tag';
import { SharedService } from '../core/shared.service';
import { UserTagSearch } from '../core/domain/user';

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
    usersTag: new Array<UserTagSearch>(),
    tags: new Array<Tag>()
  }


  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private sharedServices: SharedService
  ) {
    this.search.form = formBuilder.group({
      text: new FormControl('')
    })
  }

  ngOnInit() {
    this.sharedServices.getTags().then(tags => {
      this.tags = tags
      this.search.form.controls.text.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((text: string) => text.toLocaleLowerCase().trim().split(',').map(x => x.trim()).filter(x => x))
      ).subscribe(searchTags => {
        this.search.tags = this.tags.filter(x => searchTags.indexOf(x.name.trim().toLocaleLowerCase()) > -1)
        this.sharedServices.getUsersByTag(this.search.tags).then(data => {
          this.search.usersTag = data
        })
      })
    })
  }

}
