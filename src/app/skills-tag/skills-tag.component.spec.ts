import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsTagComponent } from './skills-tag.component';

describe('SkillsTagComponent', () => {
  let component: SkillsTagComponent;
  let fixture: ComponentFixture<SkillsTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
