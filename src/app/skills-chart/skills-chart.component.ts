import { Component, OnInit, ElementRef, OnChanges, Input, ViewChild, AfterViewInit } from '@angular/core'
import { SkillChartNode, Skill, SkillChartRow } from '../core/domain/skill'
import { RadarChartService } from '../core/radar-chart.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-skills-chart',
  templateUrl: './skills-chart.component.html',
  styleUrls: ['./skills-chart.component.css']
})
export class SkillsChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() skills: Array<Skill>
  @Input() drawLevels: boolean = true
  @Input() drawExps: boolean = true
  @ViewChild('skillschartcontainer', { static: true }) element: ElementRef

  private htmlElement: HTMLElement

  constructor(private chartService: RadarChartService) { }

  private buildExpRow(): SkillChartRow {
    let expRow: SkillChartRow = new SkillChartRow()
    expRow.name = 'Experience'
    expRow.color = '#ff4444'
    expRow.nodes = _.map(this.skills, (skill: Skill) => {
      let node = new SkillChartNode()
      node.name = skill.name
      node.label = skill.exp.name
      node.value = skill.exp.value
      return node
    })
    return expRow
  }

  private buildLevelRow(): SkillChartRow {
    let levelRow: SkillChartRow = new SkillChartRow()
    levelRow.name = 'Level'
    levelRow.color = '#33b5e5'
    levelRow.nodes = _.map(this.skills, (skill: Skill) => {
      let node = new SkillChartNode()
      node.name = skill.name
      node.label = skill.level.name
      node.value = skill.level.value
      return node
    })
    return levelRow
  }

  private buildChartData(): Array<SkillChartRow> {
    let data: Array<SkillChartRow> = []
    if (this.skills && this.skills.length > 0) {
      this.drawExps ? data.push(this.buildExpRow()) : true
      this.drawLevels ? data.push(this.buildLevelRow()) : true
    }
    return data
  }

  private calculateNumberOfLevels() {
    let levels = 3
    if (this.skills && this.skills.length > 0) {
      return _.max([
        this.drawExps ? _.maxBy(this.skills, (skill: Skill) => skill.exp.value).exp.value : 3,
        this.drawLevels ? _.maxBy(this.skills, (skill: Skill) => skill.level.value).level.value : 3
      ])
    }
    return levels
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement
    this.chartService.setup(this.htmlElement)
  }

  ngOnChanges(): void {
    this.htmlElement.innerHTML = ''
    this.chartService.setupAndPopulate(
      this.htmlElement,
      this.buildChartData(),
      this.calculateNumberOfLevels()
    )
  }

}
