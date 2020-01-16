import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './domain/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private db: AngularFirestore) { }

  getSkills() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('skills').where('valid', '==', 'true').get().then(res => {
        let skills: Array<string>  = [];
        res.forEach(doc => {
          skills.push(doc.id);
        });
        resolve(skills);
      }).catch(err => reject(err));
    });
  }

  getExps() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('exps').where('valid', '==', 'true').get().then(res => {
        let exps: Array<string>  = [];
        res.forEach(doc => {
          exps.push(doc.id);
        });
        resolve(exps);
      }).catch(err => reject(err));
    });
  }

  getLevels() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('levels').where('valid', '==', 'true').get().then(res => {
        let levels: Array<string>  = [];
        res.forEach(doc => {
          levels.push(doc.id);
        });
        resolve(levels);
      }).catch(err => reject(err));
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
            roles: doc.data().roles
          }
          users.push(user);
        });
        resolve(users);
      }).catch(err => reject(err));
    });
  }
}
