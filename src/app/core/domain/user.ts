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

export class UserTagSearch {
  user: User
  constructor(data?: any) {
    if (!data) return
    this.user = data.user
  }
}
