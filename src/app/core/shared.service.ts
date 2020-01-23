import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill } from '../core/domain/skill'
import { User } from './domain/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private db: AngularFirestore) { }

  getSkills() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('skills').where('valid', '==', true).get().then(res => {
        const skills: Array<Skill>  = [];
        res.forEach(doc => {
          skills.push({
            name : doc.id,
            ...doc.data().skill
          })
        });
        resolve(skills);
      }).catch(err => reject(err));
    });
  }

  getUsers() {
    return new Promise<Array<User>>((resolve, reject): any => {
      this.db.firestore.collection('users').get().then(res => {
        const users: Array<User>  = [];
        res.forEach(doc => {
          const user: User = {
            email: doc.id,
            displayName: doc.data().displayName,
            roles: doc.data().roles,
            active: doc.data().active
          }
          users.push(user);
        });
        resolve(users);
      }).catch(err => reject(err));
    });
  }

  addUser(email: string, user: User) {
    return new Promise<any>((resolve, reject): any => {
      this.db.firestore.collection('users').doc(email).set(user).then(
        respuesta => {
          resolve(respuesta);
        }).catch(error => {
          reject(error);
        });
    });
  }

  editUser(email: string, data) {
    return new Promise<any>((resolve, reject): any => {
      this.db.firestore.collection('users').doc(email).update(data)
      .then(respuesta => {
        resolve(respuesta);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
