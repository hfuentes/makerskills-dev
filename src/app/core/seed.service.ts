import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(private db: AngularFirestore) { }

  //TODO delete seed method
  public populate(): void {

    //Timestamp
    // import * as firebase from 'firebase'
    // firebase.firestore.FieldValue.serverTimestamp()

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

    
    //Init skills
    /*const skillsRef = this.db.collection('skills')
    skillsRef.doc('AngularJS').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('Java 7').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('React').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('Node').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('PL SQL').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('MongoDB').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('JasperReports').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('JavaScript').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('Sketch').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('Bootstrap').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('HTML5').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('CSS3').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('Illustrator').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('Photoshop').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('Adobe Fireworks').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    skillsRef.doc('JQuery').set({ valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })*/
    //Init levels
    /*const levelsRef = this.db.firestore.collection('levels')
    levelsRef.doc('Junior').set({ value: 1, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    levelsRef.doc('Medium').set({ value: 2, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    levelsRef.doc('Senior').set({ value: 3, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    //Init exps
    const expsRef = this.db.firestore.collection('exps')
    expsRef.doc('1 Year').set({ value: 1, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('2 Years').set({ value: 2, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('3 Years').set({ value: 3, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('4 Years').set({ value: 4, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('5 Years').set({ value: 5, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('6 Years').set({ value: 6, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('7 Years').set({ value: 7, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('8 Years').set({ value: 8, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('9 Years').set({ value: 9, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })
    expsRef.doc('10 Years').set({ value: 10, valid: true, created: firebase.firestore.FieldValue.serverTimestamp(), roles: { admin: true} })*/
  }
}
