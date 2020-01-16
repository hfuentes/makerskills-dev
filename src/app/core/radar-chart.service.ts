import { Injectable } from '@angular/core'
import * as d3 from 'd3'
import { SkillChartRow } from './domain/skill'

@Injectable({ providedIn: 'root' })
export class RadarChartService {

  private host
  private svg
  private config
  private axisSlugs = []
  private axisLabels = []
  private totalAxes = 0
  private radius
  private axes
  private levels
  private nodes
  private tooltip

  constructor() {
    this.config = {
      margin: {
        top: 50,
        right: 150,
        bottom: 50,
        left: 150
      },
      width: 250,
      height: 250,
      radians: 2 * Math.PI,
      levels: 5, //five levels by default
    }
    this.radius = Math.min(this.config.width / 2, this.config.height / 2)
  }

  public setup(htmlElement: HTMLElement): void {
    this.host = d3.select(htmlElement)
    if (!this.svg) this.buildSVG()
    if (this.svg) {
      this.drawAxes()
      this.drawLevels()
    }
  }

  public setupAndPopulate(htmlElement: HTMLElement, data: Array<SkillChartRow>, levels: number) {
    this.host = d3.select(htmlElement)
    this.config.levels = levels
    this.setAxis(data)
    this.buildSVG()
    if (this.svg) {
      this.drawAxes()
      this.drawLevels()
    }
    this.populate(data)
  }

  private setAxis(data: Array<SkillChartRow>): void {
    this.axisLabels = []
    if (data.length <= 0) return
    for (let i = 0; i < data[0].nodes.length; i++) {
      this.axisLabels.push(data[0].nodes[i].name)
      this.axisSlugs.push(data[0].nodes[i].slug)
    }
    this.totalAxes = this.axisLabels.length
  }

  private buildSVG(): void {
    this.svg = this.host.append('svg')
      .attr('width', this.config.width + this.config.margin.left + this.config.margin.right)
      .attr('height', this.config.height + this.config.margin.top + this.config.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.config.margin.left + ',' + this.config.margin.top + ')')
      .append('g')
    this.tooltip = this.host.append('div').attr('class', 'skill-tooltip').style('opacity', 0)
  }

  private drawAxes(): void {
    this.axes = this.svg.selectAll('.axis')
      .data(this.axisLabels).enter()
      .append('g')
      .attr('class', d => 'axis ' + d)

    this.axes.append('line')
      .attr('class', 'axis-line')
      .attr('x1', this.config.width / 2)
      .attr('y1', this.config.width / 2)
      .attr('x2', (d, i) => { return this.config.width / 2 * (1 - Math.sin(i * this.config.radians / this.totalAxes)) })
      .attr('y2', (d, i) => { return this.config.height / 2 * (1 - Math.cos(i * this.config.radians / this.totalAxes)) })

    this.axes.append('text')
      .attr('class', 'label')
      .text((d: string) => d)
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => { return this.config.width / 2 * (1 - 1.3 * Math.sin(i * this.config.radians / this.totalAxes)) })
      .attr('y', (d, i) => { return this.config.height / 2 * (1 - 1.1 * Math.cos(i * this.config.radians / this.totalAxes)) })
  }

  private drawLevels(): void {
    this.levels = this.svg.selectAll('.levels')
      .append('g').attr('class', 'levels')

    for (let level = 0; level < this.config.levels; level++) {
      let levelFactor = this.radius * ((level + 1) / this.config.levels)

      // build level-lines
      this.levels
        .data(this.axisLabels).enter()
        .append('line')
        .attr('class', 'level')
        .attr('x1', (d, i) => { return levelFactor * (1 - Math.sin(i * this.config.radians / this.totalAxes)) })
        .attr('y1', (d, i) => { return levelFactor * (1 - Math.cos(i * this.config.radians / this.totalAxes)) })
        .attr('x2', (d, i) => { return levelFactor * (1 - Math.sin((i + 1) * this.config.radians / this.totalAxes)) })
        .attr('y2', (d, i) => { return levelFactor * (1 - Math.cos((i + 1) * this.config.radians / this.totalAxes)) })
        .attr('transform', 'translate(' + (this.config.width / 2 - levelFactor) + ', ' + (this.config.height / 2 - levelFactor) + ')')
    }
  }

  public populate(data: Array<SkillChartRow>): void {
    if (!this.svg) return

    const over = 'ontouchstart' in window ? 'touchstart' : 'mouseover'
    const out = 'ontouchstart' in window ? 'touchend' : 'mouseout'

    this.nodes = this.svg.selectAll('.skill-row').data(data, (row: SkillChartRow) => row.slug)
    this.nodes.exit().remove()

    let enterSelection = this.nodes.enter().append('g')
      .attr('class', (row: SkillChartRow) => 'skill ' + row.slug)

    enterSelection.append('polygon')
      .attr('class', 'area')
      .attr('points', (row: SkillChartRow) => this.getSkillChartCoordinatesString(row))
      .attr('stroke-width', '1.5px')
      .attr('stroke', (row: SkillChartRow) => {
        return row.color
      })
      .attr('fill', (row: SkillChartRow) => row.color)
      .attr('fill-opacity', 0.3)
      .attr('stroke-opacity', 1)
      .on(over, (row: SkillChartRow) => {
        this.svg.selectAll('polygon').transition(200).attr('fill-opacity', 0.1)
        this.svg.selectAll('g.skill.' + row.slug + ' polygon').transition(200).attr('fill-opacity', 0.7)
        this.tooltipShow(row)
      })
      .on(out, _ => {
        this.svg.selectAll('polygon').transition(200).attr('fill-opacity', 0.3)
        this.tooltipHide()
      })
  }

  private getSkillChartCoordinatesString(row: SkillChartRow): string {
    const coords = this.getSkillChartCoordinates(row)
    let pointsString = ''
    coords.forEach(point => {
      pointsString += point.x + ',' + point.y + ' '
    })
    return pointsString
  }

  private getSkillChartCoordinates(row: SkillChartRow): Array<any> {
    const maxValue = this.config.levels
    const coords = []
    row.nodes.forEach((node, index) => {
      coords.push({
        x: this.config.width / 2 * (1 - (node.value / maxValue) * Math.sin(index * this.config.radians / this.totalAxes)),
        y: this.config.height / 2 * (1 - (node.value / maxValue) * Math.cos(index * this.config.radians / this.totalAxes))
      })
    })
    return coords
  }

  private tooltipShow(row: SkillChartRow): void {
    this.tooltip.transition().duration(200).style('opacity', .9)
    let html = '<h3 class="header">' + row.name + '</h3>'
    row.nodes.forEach((node) => {
      html += '<div class="rating">' + node.name + ': ' + node.label + ' (' + node.value + ')</div>'
    })
    this.tooltip.html(html)
    this.tooltip.style('left', (d3.event.pageX) + 'px').style('top', (d3.event.pageY - 28) + 'px')
      .style('border-color', row.color)
  }

  private tooltipHide(): void {
    this.tooltip.transition().duration(500).style('opacity', 0)
  }
}
