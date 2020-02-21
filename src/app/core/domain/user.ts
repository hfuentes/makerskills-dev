import { Tag } from './tag'
import { Settings, LoadingPlace } from 'src/app/error-handler/error-handler.component'

export interface Roles {
  admin: boolean
  profile: boolean
  searcher: boolean
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

export class UserAdminItem {
  user: User
  state = {
    activeLoading: false,
    activeError: null,
    activeSettings: new Settings({ place: LoadingPlace.textLeft }),
    rolesLoading: false,
    rolesError: null,
    rolesSettings: new Settings({ place: LoadingPlace.textLeft })
  }
  constructor(data?: any) {
    if (!data) return
    this.user = data.user
  }
}

export class UserItemsSearch {
  user: User
  items: Array<UserItemSearch>
  get rating(): number {
    if (this.items && this.items.length > 0) {
      return this.items.map(x => x.weight * x.avgLevels).reduce((p, c) => c += p)
    }
    return 0
  }
  constructor(data?: any) {
    if (!data) return
    this.user = data.user
    this.items = data.items
  }
}

export class UserItemSearch {
  item: string
  bg: string
  avgLevels: number
  weight: number
  constructor(data?: any) {
    if (!data) return
    this.item = data.item
    this.bg = data.bg
    this.avgLevels = data.avgLevels
    this.weight = data.weight
  }
}
