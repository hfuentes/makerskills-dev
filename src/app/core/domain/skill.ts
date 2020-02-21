import { DocumentReference } from '@angular/fire/firestore'
import { SkillTag } from './tag'
import { getLevelLabel } from '../constants/constants'

export class Skill {
  name: string
  exp: number
  level: number
  ref: DocumentReference
  tags: Array<SkillTag>
  get id() {
    return this.ref ? this.ref.id : null
  }
  get levelLabel() {
    return getLevelLabel(this.level)
  }
  constructor(data?: any) {
    if (data) {
      this.name = data.name
      this.exp = data.exp
      this.level = data.level
      this.ref = data.ref
      this.tags = data.tags
    }
  }
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
  get check(): boolean {
    return this.skill &&
      this.skill.exp &&
      this.skill.level &&
      this.skill.exp > 0 &&
      this.skill.level > 0
  }
  constructor(data?: any) {
    this.skill = data.skill
  }
}
