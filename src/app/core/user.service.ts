import { User } from './domain/user'
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Skill } from './domain/skill'
import * as firebase from 'firebase'
import { SkillTag, Tag } from './domain/tag'

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private db: AngularFirestore
  ) { }

  getUserByEmail(email: string = ''): any {
    return new Promise<any>((resolve, reject) => {
      return this.db.firestore.collection('users').doc(email).get()
        .then(doc => {
          if (doc && doc.exists && doc.data().active === true) {
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
            let skills: Array<Skill> = []
            if (doc.data().skills && doc.data().skills.length > 0) {
              skills = doc.data().skills.map(x => {
                const skill = new Skill({
                  exp: x.exp,
                  level: x.level,
                  name: x.name,
                  ref: x.ref,
                  tags: x.tags ? x.tags.map(t => new SkillTag(t.name, t.ref)) : []
                })
                return skill
              })
            }
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
          skills: [...skills.map(x => {
            return {
              exp: x.exp,
              level: x.level,
              name: x.name,
              ref: x.ref,
              tags: x.tags ? x.tags.map(y => {
                return {
                  name: y.name,
                  ref: y.ref
                }
              }) : []
            }
          })]
        }).then(() => resolve()).catch(err => reject(err))
      } else reject()
    })
  }
}
