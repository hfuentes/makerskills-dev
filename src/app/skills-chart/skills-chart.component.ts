import { Component, OnInit, ElementRef, OnChanges, Input, ViewChild, AfterViewInit, DoCheck, IterableDiffers, IterableDiffer } from '@angular/core'
import { SkillChartNode, Skill, SkillChartRow } from '../core/domain/skill'
import { RadarChartService } from '../core/radar-chart.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-skills-chart',
  templateUrl: './skills-chart.component.html',
  styleUrls: ['./skills-chart.component.css']
})
export class SkillsChartComponent implements OnInit, OnChanges, AfterViewInit, DoCheck {

  @Input() skills: Array<Skill>
  @Input() drawLevels: boolean = true
  @Input() drawExps: boolean = true
  @ViewChild('skillschartcontainer', { static: true }) element: ElementRef

  private htmlElement: HTMLElement
  private iterableDiffer: IterableDiffer<unknown>

  constructor(
    private chartService: RadarChartService,
    private iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  private setupAndPopulateChart(): void {
    if (this.htmlElement) this.htmlElement.innerHTML = ''
    this.chartService.setupAndPopulate(
      this.htmlElement,
      this.buildChartData(),
      this.calculateNumberOfLevels()
    )
  }

  private buildExpRow(): SkillChartRow {
    let expRow: SkillChartRow = new SkillChartRow()
    expRow.name = 'Experience'
    expRow.color = '#ff4444'
    expRow.nodes = _.map(this.skills, (skill: Skill) => {
      let node = new SkillChartNode()
      node.name = skill.name
      node.label = skill.exp + ' Years'
      node.value = skill.exp
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
      node.label = skill.level + ' Level'
      node.value = skill.level
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
        this.drawExps ? _.maxBy(this.skills, (skill: Skill) => skill.exp).exp : 3,
        this.drawLevels ? _.maxBy(this.skills, (skill: Skill) => skill.level).level : 3
      ])
    }
    return levels
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement
    console.log(this.element)
  }

  ngOnChanges(): void {
    this.setupAndPopulateChart()
  }

  ngDoCheck(): void {
    let changes = this.iterableDiffer.diff(this.skills);
    if (changes) {
      this.setupAndPopulateChart()
    }
  }

}
