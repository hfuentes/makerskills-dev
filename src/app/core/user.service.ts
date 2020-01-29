import { User } from './domain/user'
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Skill } from './domain/skill'
import * as firebase from 'firebase'

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private db: AngularFirestore
  ) { }

  getUserByEmail(email: string = ''): any {
    return new Promise<any>((resolve, reject) => {
      return this.db.firestore.collection('users').doc(email).get()
        .then(doc => {
          if (doc && doc.exists && doc.data().active == true) {
            const user: User = {
              email: doc.id,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              roles: doc.data().roles,
              active: doc.data().active
            }
            return resolve(user)
          } else resolve()
        }).catch(err => reject(err))
    })
  }

  updateUserByGoogleProfile(googleProfile: any = {}): any {
    return new Promise<any>((resolve, reject) => {
      const profile = googleProfile.additionalUserInfo.profile
      return this.db.firestore.collection('users').doc(profile.email).update({
        displayName: profile.name,
        photoURL: profile.picture
      }).then(() => resolve(profile)).catch(err => reject(err))
    })
  }

  getSkills(user: User = null): any { //get user's skills
    return new Promise<any>((resolve, reject) => {
      if (user && user.email) {
        return this.db.firestore.collection('users').doc(user.email).get().then(doc => {
          if (doc && doc.exists) {
            const skills: Array<Skill> = doc.data().skills
            return resolve(skills)
          } else resolve()
        }).catch(err => reject(err))
      } else reject()
    })
  }

  setSkills(user: User = null, skills: Array<Skill> = []) { //set user's skills
    return new Promise<any>((resolve, reject) => {
      if (user && user.email) {
        return this.db.firestore.collection('users').doc(user.email).update({
          skills: [...skills]
        }).then(() => resolve()).catch(err => reject(err))
      } else reject()
    })
  }

  getUsersBySkill(skills: Array<string> = []) {
    throw 'Not Implemented'
  }
}
