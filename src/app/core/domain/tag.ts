import { Skill } from './skill'
import { DocumentReference } from '@angular/fire/firestore'

export class Tag {
  id: string
  name: string
  active: boolean
  skills?: Array<Skill>
  avgLeveles?: number
  avgExps?: number
  constructor(data?: any) {
    if (data.id) this.id = data.id
    if (data.name) this.name = data.name
    if (data.active) this.active = data.active
    if (data.skills) this.active = data.skills
    if (data.avgLeveles) this.active = data.avgLeveles
    if (data.avgExps) this.active = data.avgExps
  }
  calcAvgLeveles() {
    if (this.skills) {
      if (this.skills.length === 0) this.avgLeveles = 0
      else if (this.skills.length === 1) this.avgLeveles = this.skills[0].level
      else this.avgLeveles = this.skills.map(x => x.level).reduce((p, c) => c += p) / this.skills.length
      return this.avgLeveles
    }
  }
  calAvgExps() {
    if (this.skills.length === 0) this.avgExps = 0
    else if (this.skills.length === 1) this.avgExps = this.skills[0].exp
    else this.avgExps = this.skills.map(x => x.exp).reduce((p, c) => c += p) / this.skills.length
    return this.avgExps
  }
}

export class SkillTag {
  name: string
  ref: DocumentReference
  constructor(name?: string, ref?: DocumentReference) {
    if (name) this.name = name
    if (ref) this.ref = ref
  }
}
