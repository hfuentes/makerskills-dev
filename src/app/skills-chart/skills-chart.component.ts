import {
  Component, OnInit, ElementRef, Input, ViewChild, AfterViewInit, DoCheck, IterableDiffers, IterableDiffer, KeyValueDiffer, KeyValueDiffers
} from '@angular/core'
import { SkillChartNode, Skill, SkillChartRow } from '../core/domain/skill'
import { RadarChartService } from '../core/radar-chart.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-skills-chart',
  templateUrl: './skills-chart.component.html',
  styleUrls: ['./skills-chart.component.scss']
})
export class SkillsChartComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() skills: Array<Skill>
  @Input() drawLevels = true
  @Input() drawExps = true
  @ViewChild('skillschartcontainer', { static: true }) element: ElementRef

  private htmlElement: HTMLElement
  private iterableDiffer: IterableDiffer<unknown>
  private differ: KeyValueDiffer<string, any>

  constructor(
    private chartService: RadarChartService,
    private iterableDiffers: IterableDiffers,
    private differs: KeyValueDiffers
  ) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
    this.differ = this.differs.find({}).create();
  }

  private setupAndPopulateChart(): void {
    if (this.skills && this.skills.length > 2) {
      if (this.htmlElement) this.htmlElement.innerHTML = ''
      this.chartService.setupAndPopulate(
        this.htmlElement,
        this.buildChartData(),
        this.calculateNumberOfLevels()
      )
    }
  }

  private buildExpRow(): SkillChartRow {
    const expRow: SkillChartRow = new SkillChartRow()
    expRow.name = 'Experience'
    expRow.color = '#ff4444'
    expRow.nodes = _.map(this.skills, (skill: Skill) => {
      const node = new SkillChartNode()
      node.name = skill.name
      node.label = skill.exp + ' Years'
      node.value = skill.exp
      return node
    })
    return expRow
  }

  private buildLevelRow(): SkillChartRow {
    const levelRow: SkillChartRow = new SkillChartRow()
    levelRow.name = 'Level'
    levelRow.color = '#33b5e5'
    levelRow.nodes = _.map(this.skills, (skill: Skill) => {
      return {
        name: skill.name,
        label: 'Level ' + skill.level,
        value: skill.level
      }
    })
    return levelRow
  }

  private buildChartData(): Array<SkillChartRow> {
    let data: Array<SkillChartRow>
    data = []
    if (this.skills && this.skills.length > 0) {
      if (this.drawExps) data.push(this.buildExpRow())
      if (this.drawLevels) data.push(this.buildLevelRow())
    }
    return data
  }

  private calculateNumberOfLevels() {
    const defaultLevels = 5
    if (this.skills && this.skills.length > 0) {
      return _.max([
        this.drawExps ? _.maxBy(this.skills, (skill: Skill) => skill.exp).exp : defaultLevels,
        this.drawLevels ? _.maxBy(this.skills, (skill: Skill) => skill.level).level : defaultLevels
      ])
    }
    return defaultLevels
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement
  }

  ngDoCheck(): void {
    if (this.iterableDiffer.diff(this.skills) || this.differ.diff(this)) {
      this.setupAndPopulateChart()
    }
  }

}
