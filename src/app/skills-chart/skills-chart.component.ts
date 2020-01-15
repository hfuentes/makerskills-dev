import { Component, OnInit, ElementRef, OnChanges, Input, ViewChild, AfterViewInit } from '@angular/core'
import { SkillChartNode, Skill, SkillChartRow } from '../core/domain/skill'
import { RadarChartService } from '../core/radar-chart.service'

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

  private buildChartData(skills: Array<Skill>): Array<SkillChartRow> {
    let data: Array<SkillChartRow> = []

    if (skills && skills.length > 0) {
      //exp
      let row: SkillChartRow = new SkillChartRow()
      row.name = 'Exp'
      for (let i = 0; i < skills.length; i++) {
        let node: SkillChartNode = new SkillChartNode()
        node.name = skills[i].name
        node.label = skills[i].exp.name
        node.value = skills[i].exp.value
        row.nodes.push(node)
      }
      data.push(row)

      //level
      let row2: SkillChartRow = new SkillChartRow()
      row2.name = 'Level'
      for (let i = 0; i < skills.length; i++) {
        let node: SkillChartNode = new SkillChartNode()
        node.name = skills[i].name
        node.label = skills[i].level.name
        node.value = skills[i].level.value
        row2.nodes.push(node)
      }
      data.push(row2)

      return data
    }
    return []
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

    //this.chartService.populate(this.data)
  }

}
