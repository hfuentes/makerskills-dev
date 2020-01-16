export interface Roles {
    admin: boolean;
    profile: boolean;
}

export class User {
    email: string;
    displayName: string;
    photoURL?: string;
    roles: Roles;
    active: boolean;

    constructor() {}
}