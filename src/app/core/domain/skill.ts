export class Skill {
  name: string
  exp: number
  level: number
  constructor() { }
}

export class SkillChartNode {
  name: string
  get slug(): string {
    return this.name.toLowerCase().replace(' ', '_').replace(/[^a-zA-Z0-9]+/g, '')
  }
  label: string
  value: number
}

export class SkillChartRow {
  name: string
  get slug(): string {
    return this.name.toLowerCase().replace(' ', '_').replace(/[^a-zA-Z0-9]+/g, '')
  }
  nodes: Array<SkillChartNode> = []
  color: string
}
