import { Injectable } from '@angular/core'
import { CanActivate, /*CanActivateChild, CanLoad, Route, UrlSegment,*/ ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate/*, CanActivateChild, CanLoad*/ {
  
  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.authenticated) { return true }
      return this.auth.currentUserObservable.take(1).map(user => !!user).do(loggerIn => {
        if (!loggerIn) {
          console.debug('access denied!')
          this.router.navigate(['/login'])
        }
      })
    }
  /*canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }*/
  /*canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true
  }*/
}
