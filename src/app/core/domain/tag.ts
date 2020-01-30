import { Skill } from './skill'
import { DocumentReference } from '@angular/fire/firestore'

export class Tag {
  id: string
  name: string
  active: boolean
  skills?: Array<Skill>
  constructor()
  constructor(id?: string, name?: string, active?: boolean) {
    if (id) this.id = id
    if (name) this.name = name
    if (active) this.active = active
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
