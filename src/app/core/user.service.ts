import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  getUserByEmail(email: string = ''): any {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('users').doc(email).get()
        .then(doc => {
          return resolve(new User(
            doc.id,
            doc.data().displayName,
            doc.data().photoURL
          ))
        }).catch(err => reject(err))
    })
  }

  updateUserByGoogleProfile(googleProfile: any = {}): any {
    const profile = googleProfile.additionalUserInfo.profile
    return this.db.firestore.collection('users').doc(profile.email).update({
      displayName: profile.name,
      photoURL: profile.picture
    })
  }

  /*
  Inicia usuarios:
  this.db.collection("users").doc("hector.fuentes@imagemaker.com").set(JSON.parse(JSON.stringify(new User('', 'Héctor Fuentes', ''))))
  this.db.collection("users").doc("alexis.veas@imagemaker.com").set(JSON.parse(JSON.stringify(new User('', 'Alexis Veas', ''))))
  this.db.collection("users").doc("makerskills.dev@gmail.com").set(JSON.parse(JSON.stringify(new User('', 'Admin', ''))))
  */
}
