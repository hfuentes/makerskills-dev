export interface Exp {
  name: string
  value: number
}

export interface Level {
  name: string
  value: number
}

export class Skill {
  name: string
  exp: Exp
  level: Level
  constructor() { }
}

export class SkillChartNode {
  name: string
  get slug(): string {
    return this.name.toLowerCase().replace(' ','_').replace(/[^a-zA-Z0-9]+/g, '')
  }
  label: string
  value: number
}

export class SkillChartRow {
  name: string
  get slug(): string {
    return this.name.toLowerCase().replace(' ','_').replace(/[^a-zA-Z0-9]+/g, '')
  }
  nodes: Array<SkillChartNode> = []
  color: string
  maxLabel: string
  minLabel: string
}
