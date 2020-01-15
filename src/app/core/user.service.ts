import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill2 } from './domain/skill';
import * as firebase from 'firebase'
import { User } from './domain/user';

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
      return this.db.firestore.collection('users').doc(email).collection('skills').get()
        .then(docs => {
          let skills: Array<Skill2> = []
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

  //TODO delete seed method
  seed(): void {
    /*
    //Init user data
    this.db.collection("users").doc("hector.fuentes@imagemaker.com").set(JSON.parse(JSON.stringify(new User('', 'Héctor Fuentes', ''))))
    this.db.collection("users").doc("alexis.veas@imagemaker.com").set(JSON.parse(JSON.stringify(new User('', 'Alexis Veas', ''))))
    this.db.collection("users").doc("makerskills.dev@gmail.com").set(JSON.parse(JSON.stringify(new User('', 'Admin', ''))))
    */

    /*
    //Init skills users data
    const ref = this.db.collection('users').doc('hector.fuentes@imagemaker.com').collection('skills')
    ref.doc('AngularJS').set({ exp: { name: '3 Years', value: 3 }, level: { name: 'Medium', value: 2 }})
    ref.doc('Java 7').set({ exp: { name: '2 Years', value: 2 }, level: { name: 'Senior', value: 3 }})
    ref.doc('React').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Junior', value: 1 }})
    ref.doc('Node').set({ exp: { name: '2 Years', value: 2 }, level: { name: 'Medium', value: 2 }})
    ref.doc('PL SQL').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Medium', value: 2 }})
    ref.doc('MongoDB').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Junior', value: 1 }})
    ref.doc('JasperReports').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Medium', value: 2 }})
    ref.doc('JavaScript').set({ exp: { name: '4 Years', value: 4 }, level: { name: 'Senior', value: 3 }})
    */

    /*
    //Init skills data
    const ref = this.db.collection('skills')
    ref.doc('AngularJS').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    ref.doc('Java 7').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    ref.doc('React').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    ref.doc('Node').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    ref.doc('PL SQL').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    ref.doc('MongoDB').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    ref.doc('JasperReports').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    ref.doc('JavaScript').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
    */

    /*
    //Init full user
    this.db.collection("users").doc("gabriel.torres@imagemaker.com").set({ email: 'gabriel.torres@imagemaker.com', displayName: 'Gabriel Torres', photoURL: '', roles: { admin: false, profile: true } }).then(() => {
      const skillsRef = this.db.collection('skills')
      skillsRef.doc('Sketch').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      skillsRef.doc('Bootstrap').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      skillsRef.doc('HTML5').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      skillsRef.doc('CSS3').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      skillsRef.doc('Illustrator').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      skillsRef.doc('Photoshop').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      skillsRef.doc('Adobe Fireworks').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      skillsRef.doc('JQuery').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp() })
      const userSkillsRef = this.db.collection('users').doc('gabriel.torres@imagemaker.com').collection('skills')
      userSkillsRef.doc('Sketch').set({ exp: { name: '3 Years', value: 3 }, level: { name: 'Medium', value: 2 } })
      userSkillsRef.doc('Bootstrap').set({ exp: { name: '2 Years', value: 2 }, level: { name: 'Senior', value: 3 } })
      userSkillsRef.doc('HTML5').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Junior', value: 1 } })
      userSkillsRef.doc('CSS3').set({ exp: { name: '2 Years', value: 2 }, level: { name: 'Medium', value: 2 } })
      userSkillsRef.doc('Illustrator').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Medium', value: 2 } })
      userSkillsRef.doc('Photoshop').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Junior', value: 1 } })
      userSkillsRef.doc('Adobe Fireworks').set({ exp: { name: '1 Years', value: 1 }, level: { name: 'Medium', value: 2 } })
      userSkillsRef.doc('JQuery').set({ exp: { name: '4 Years', value: 4 }, level: { name: 'Senior', value: 3 } })
    })
    */
  }
}
