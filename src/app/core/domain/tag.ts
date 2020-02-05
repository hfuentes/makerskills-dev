import { Skill } from './skill'
import { DocumentReference } from '@angular/fire/firestore'

export class Tag {
  id: string
  name: string
  active: boolean
  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.active = data.active
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

export class DashboardTag {
  tag: Tag
  skills: Array<Skill>
  bg: string
  get avgLeveles(): number {
    if (this.skills) {
      if (this.skills.length === 0) return 0
      else if (this.skills.length === 1) return this.skills[0].level
      else return this.skills.map(x => x.level).reduce((p, c) => c += p) / this.skills.length
    }
    return null
  }
  constructor(data: any) {
    this.tag = data.tag
    this.skills = data.skills
  }
  setBg(): void {
    const bgClassList = [
      'bg-primary',
      'bg-success',
      'bg-danger',
      'bg-warning',
      'bg-info']
    this.bg = bgClassList[Math.floor(Math.random() * bgClassList.length)]
  }
}
