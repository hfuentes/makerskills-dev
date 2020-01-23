import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Params } from './domain/params';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  constructor(private db: AngularFirestore) { }

  getParams() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('params').get().then(res => {
        const params = new Params()
        res.forEach(item => {
          if (item.id === 'levels') {
            params.minLevel = item.data().min
            params.maxLevel = item.data().max
          } else if (item.id === 'exps') {
            params.minExp = item.data().min
            params.maxExp = item.data().max
          }
        })
        return resolve(params)
      }).catch(err => reject(err))
    })
  }
}
