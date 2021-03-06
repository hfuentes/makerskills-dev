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

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userService.getUserByEmail(auth.email).then(user => {
          if (user) {
            localStorage.setItem('userData', JSON.stringify(user))
          } else {
            localStorage.removeItem('userData')
            router.navigate(['login'])
          }
        }).catch(() => {
          localStorage.removeItem('userData')
          router.navigate(['login'])
        })
      } else {
        localStorage.removeItem('userData')
        router.navigate(['login'])
      }
    })
  }

  get userData(): User {
    const userStr = localStorage.getItem('userData')
    if (userStr) return JSON.parse(userStr)
    return null
  }

  get authenticated(): boolean {
    return localStorage.getItem('userData') ? true : false
  }

  matchingRoles(roles: Array<string> = [], strict = true): boolean {
    if (this.userData.roles) {
      const mapper = roles.map(role => this.userData.roles[role])
      return strict ? mapper.every(role => role) : mapper.includes(true)
    }
    return false
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      return this.afAuth.auth
        .signInWithPopup(provider)
        .then(profile => this.userService.updateUserByGoogleProfile(profile))
        .then(profile => this.userService.getUserByEmail(profile.email))
        .then(user => {
          delete user.skills //skills has 
          localStorage.setItem('userData', JSON.stringify(user))
          return resolve(user)
        }).catch(err => reject(err))
    })
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signOut().then(res => {
        localStorage.removeItem('userData')
        resolve(res)
      }).catch(err => reject(err))
    })
  }

}
