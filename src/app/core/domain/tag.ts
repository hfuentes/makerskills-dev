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
