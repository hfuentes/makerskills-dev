import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill } from './domain/skill';
import * as firebase from 'firebase';
import { User } from './domain/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: AngularFirestore) { }

  addNewSkill(skill: Skill, user: User): any {
    this.db.firestore.collection('users').doc(user.email).collection('skills').doc(skill.name).set({
      exp: skill.exp,
      level: skill.level
    })
  }

  deleteSkill(skill: Skill, user: User) {
    console.log("borrando")
    this.db.firestore.collection('users').doc(user.email).collection('skills').doc(skill.name).delete().then(
      function () {
        console.log('eliminado');
      }).catch(err => console.log('Error: ' + err))
  }

  updateSkill(skill: Skill, user: User) {
    return new Promise<any>((resolve, reject) => {
      return this.db.firestore.collection('users').doc(user.email).collection('skills').doc(skill.name).set({
        exp: skill.exp,
        level: skill.level
      }).then(() => resolve()).catch(err => reject(err))
    })
  }
}
