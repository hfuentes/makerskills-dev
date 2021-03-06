import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.authenticated) {
      if (next.data && next.data.roles && !this.auth.matchingRoles(next.data.roles)) {
        this.router.navigate(['restricted'])
        return false
      }
      return true
    }
    this.router.navigate(['login'])
    return false

  }
}
