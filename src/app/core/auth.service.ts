import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase/app'
import { User } from './domain/user'
import { UserService } from './user.service'
import * as _ from 'lodash'

@Injectable({ providedIn: 'root' })
export class AuthService {

  userData: User

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userService.getUserByEmail(auth.email).then(user => {
          this.userData = user
          localStorage.setItem('userData', JSON.stringify(this.userData))
        }).catch(() => {
          this.userData = undefined
          localStorage.removeItem('userData')
          router.navigate(['login'])
        })
      } else {
        this.userData = undefined
        localStorage.removeItem('userData')
        router.navigate(['login'])
      }
    })
  }

  get authenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('userData'))
    return user !== null && this.userData !== null
  }

  matchingRoles(roles: Array<string> = []): boolean {
    console.log('roles auth ' + JSON.stringify(roles))
    roles.forEach(role => {
      console.log('role ' + this.userData.roles[role])
      if (this.userData.roles[role]) return true
    });
    return false
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      return this.afAuth.auth
        .signInWithPopup(provider)
        .then(profile => {
          return this.userService
            .updateUserByGoogleProfile(profile)
            .then(() => {
              return resolve()
            }).catch(err => reject(err))
        }).catch(err => reject(err))
    })
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signOut().then(res => {
        this.userData = undefined
        localStorage.removeItem('userData')
        resolve(res)
      }).catch(err => reject(err))
    })
  }

}
