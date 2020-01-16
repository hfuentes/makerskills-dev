import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill, Exp, Level } from '../core/domain/skill'

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
      this.db.firestore.collection('exps').where('valid', '==', true).get().then(res => {
        let exps: Array<Exp>  = [];
        res.forEach(doc => {
          exps.push({
            name: doc.id,
            value: doc.data().value
          });
        })
        resolve(exps);
      }).catch(err => reject(err));
    });
  }

  getLevels() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('levels').where('valid', '==', true).get().then(res => {
        let levels: Array<Level>  = [];
        res.forEach(doc => {
          levels.push({
            name: doc.id,
            value: doc.data().value
          });
        })
        resolve(levels);
      }).catch(err => reject(err));
    });
  }
}
