export interface Roles {
    admin: boolean
    profile: boolean
}

export class User {
    email: string
    displayName: string
    photoURL?: string
    roles: Roles

    constructor(email, displayName, photoURL) {
        this.email = email
        this.displayName = displayName
        this.photoURL = photoURL
        this.roles = {
            admin: false,
            profile: true
        }
    }
}