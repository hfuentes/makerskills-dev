import { User } from './domain/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill } from './domain/skill';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private db: AngularFirestore) { }

  getUserByEmail(email: string = ''): any {
    return new Promise<any>((resolve, reject) => {
      return this.db.firestore.collection('users').doc(email).get()
        .then(doc => {
          return resolve({
            email: doc.id,
            ...doc.data()
          })
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

  getSkills(email: string = ''): any { //get user's skills
    return new Promise<any>((resolve, reject) => {
      return this.db.firestore.collection('users').doc(email).collection('skills').get()
        .then(docs => {
          let skills: Array<Skill> = []
          docs.forEach(doc => {
            skills.push({
              name: doc.id,
              exp: { ...doc.data().exp },
              level: { ...doc.data().level }
            })
          })
          return resolve(skills)
        }).catch(err => reject(err))
    })
  }
}
