import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private db: AngularFirestore) { }

  getSkills() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('skills').get().then(res => {
        let skills: Array<string>  = []
        res.forEach(doc => {
          skills.push(doc.id)
        })
        resolve(skills)
      }).catch(err => reject(err))
    })
  }
}
