export class NavbarMenuConstants {
    public getMenuItems(): Array<object> {
        return [
            {name: 'Dashboard', role: 'profile', route: 'dashboard'},
            {name: 'Searcher', role: 'searcher', route: 'searcher'},
            {name: 'Profile', role: 'profile', route: 'profile'},
            {name: 'Admin', role: 'admin', route: 'admin'}
        ];
    }
}
