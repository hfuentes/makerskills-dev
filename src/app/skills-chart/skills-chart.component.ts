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
  @ViewChild('skillschartcontainer', { static: true }) element: ElementRef

  private htmlElement: HTMLElement

  constructor(private chartService: RadarChartService) { }

  private buildExpRow(skills: Array<Skill>): SkillChartRow {
    let expRow: SkillChartRow = new SkillChartRow()
    expRow.name = 'Experience'
    expRow.color = '#d62728'
    expRow.nodes = _.map(skills, (skill: Skill) => {
      let node = new SkillChartNode()
      node.name = skill.name
      node.label = skill.exp.name
      node.value = skill.exp.value
      return node
    })
    return expRow
  }

  private buildLevelRow(skills: Array<Skill>): SkillChartRow {
    let levelRow: SkillChartRow = new SkillChartRow()
    levelRow.name = 'Level'
    levelRow.color = '#17becf'
    levelRow.nodes = _.map(skills, (skill: Skill) => {
      let node = new SkillChartNode()
      node.name = skill.name
      node.label = skill.level.name
      node.value = skill.level.value
      return node
    })
    return levelRow
  }

  private buildChartData(skills: Array<Skill>): Array<SkillChartRow> {
    let data: Array<SkillChartRow> = []
    if (skills && skills.length > 0) {
      data.push(this.buildExpRow(skills))
      data.push(this.buildLevelRow(skills))
    }
    return data
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement
    this.chartService.setup(this.htmlElement)
  }

  ngOnChanges(): void {
    const chartData: Array<SkillChartRow> = this.buildChartData(this.skills)
    this.chartService.setup(this.htmlElement, chartData)
    this.chartService.populate(chartData)
  }

}
