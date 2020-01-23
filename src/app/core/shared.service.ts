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
        let skills: Array<Skill>  = [];
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

  getExps() {
    return new Promise<any>((resolve, reject) => {
      return resolve([0,1,2,3,4,5,6,7,8,9,10])
      /*this.db.firestore.collection('exps').where('valid', '==', true).get().then(res => {
        let exps: Array<Exp>  = [];
        res.forEach(doc => {
          exps.push({
            name: doc.id,
            value: doc.data().value
          });
        })
        resolve(exps);
      }).catch(err => reject(err));*/
    });
  }

  getLevels() {
    return new Promise<any>((resolve, reject) => {
      return resolve([1,2,3,4,5])
      /*this.db.firestore.collection('levels').where('valid', '==', true).get().then(res => {
        let levels: Array<Level>  = [];
        res.forEach(doc => {
          levels.push({
            name: doc.id,
            value: doc.data().value
          });
        })
        resolve(levels);
      }).catch(err => reject(err));*/
    });
  }

  getUsers() {
    return new Promise<Array<User>>((resolve, reject): any => {
      this.db.firestore.collection('users').get().then(res => {
        let users: Array<User>  = [];
        res.forEach(doc => {
          let user: User = {
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

  addUser(email: string ,user: User){
    return new Promise<any>((resolve, reject): any => {
      this.db.firestore.collection('users').doc(email).set(user).then(
        respuesta => {
          resolve(respuesta);
        }).catch(error =>{
          reject(error);
        });
    });
  }

  editUser(email, data){
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
