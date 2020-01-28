import { DocumentReference } from '@angular/fire/firestore'

export class Skill {
  name: string
  exp: number
  level: number
  ref: DocumentReference
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
}