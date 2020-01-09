import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase/app'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem('userData', JSON.stringify(this.userData))
      } else {
        this.userData = undefined
        localStorage.removeItem('userData')
        router.navigate(['login'])
      }
    })
  }

  get authenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('userData'))
    return user && user !== null && user.emailVerified !== false
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  doLogout () {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signOut()
        .then(res => {
          this.userData = undefined
          localStorage.removeItem('userData')
          resolve(res)
        })
        .catch(err => reject(err))
    })
  }

}
