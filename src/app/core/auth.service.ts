import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app'
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  get currentUserObservable(): any {
    return this.afAuth.auth
  }

  doGoogleLogin = () => {
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

  doLogout = () => this.afAuth.auth.signOut()
  
}
