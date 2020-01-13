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
        res.forEach(doc => {
          
        })
      }).catch(err => console.log(err))
    })
  }
}
