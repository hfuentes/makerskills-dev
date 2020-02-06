import { DocumentReference } from '@angular/fire/firestore'
import { SkillTag } from './tag'

export class Skill {
  name: string
  exp: number
  level: number
  ref: DocumentReference
  tags: Array<SkillTag>
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

export class SkillName {
  id: string
  name: string
  active = true
  tags: Array<string>
  constructor(data?: any) {
    this.id = data.id
    this.name = data.name
    this.active = data.active
    this.tags = data.tags
  }
}

export class EvaluationSkill {
  skill: Skill
  check = false
  constructor(data?: any) {
    this.skill = data.skill
    this.check = data.check
  }
}
