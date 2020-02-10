import { Tag } from './tag'

export interface Roles {
  admin: boolean
  profile: boolean
}

export class User {
  email?: string
  displayName: string
  photoURL?: string
  roles: Roles
  active: boolean
  constructor(data?: any) {
    if (!data) return
    this.email = data.email
    this.displayName = data.displayName
    this.photoURL = data.photoURL
    this.roles = data.roles
    this.active = data.active
  }
}

export class UserTagsSearch {
  user: User
  tags: Array<UserTagSearch>
  get rating(): number {
    if (this.tags && this.tags.length > 0) {
      return this.tags.map(x => x.weight * x.avgLevels).reduce((p, c) => c += p)
    }
    return 0
  }
  constructor(data?: any) {
    if (!data) return
    this.user = data.user
    this.tags = data.tags
  }
}

export class UserTagSearch {
  tag: Tag
  bg: string
  avgLevels: number
  weight: number
  constructor(data?: any) {
    if (!data) return
    this.tag = data.tag
    this.bg = data.bg
    this.avgLevels = data.avgLevels
    this.weight = data.weight
  }
}
