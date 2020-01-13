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

  getSkills(email: string = ''): any {
    return new Promise<any>((resolve, reject) => {
      return this.db.firestore.collection('users').doc(email).get()
        .then(doc => {
          let skills: Array<Skill> = [];
          (doc.data().skills || []).forEach(skillMap => {
            skills.push(skillMap.id)
          });
        }).catch(err => reject(err))
    })
  }

  /*
  Inicia usuarios:
  this.db.collection("users").doc("hector.fuentes@imagemaker.com").set(JSON.parse(JSON.stringify(new User('', 'Héctor Fuentes', ''))))
  this.db.collection("users").doc("alexis.veas@imagemaker.com").set(JSON.parse(JSON.stringify(new User('', 'Alexis Veas', ''))))
  this.db.collection("users").doc("makerskills.dev@gmail.com").set(JSON.parse(JSON.stringify(new User('', 'Admin', ''))))
  */
}
