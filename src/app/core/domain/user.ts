export interface Roles {
    admin: boolean
    profile?: boolean
}

export class User {
    email: string
    displayName: string
    photoURL?: string
    roles: Roles

    constructor(auth) {
        this.email = auth.email
        this.displayName = auth.displayName
        this.photoURL = auth.displayName
        this.roles = {
            admin: false,
            profile: true
        }
    }
}
