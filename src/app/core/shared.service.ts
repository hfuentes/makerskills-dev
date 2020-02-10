import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SkillName } from '../core/domain/skill'
import { User } from './domain/user';
import { Tag } from './domain/tag';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private db: AngularFirestore) { }

  getSkills() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('skills').get().then(docs => {
        const skills: Array<SkillName> = [];
        docs.forEach(doc => {
          skills.push({
            id: doc.id,
            name: doc.data().name,
            active: doc.data().active,
            tags: doc.data().tags
          })
        });
        resolve(skills);
      }).catch(err => reject(err));
    })
  }

  getActiveSkills() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('skills').where('active', '==', true).get().then(docs => {
        const skills: Array<SkillName> = [];
        docs.forEach(doc => {
          skills.push({
            id: doc.id,
            name: doc.data().name,
            active: doc.data().active,
            tags: doc.data().tags
          })
        });
        resolve(skills);
      }).catch(err => reject(err));
    })
  }

  getSkillRef(id: string = '') {
    if (id) return this.db.doc('skills/' + id).ref
    throw new Error('id is required')
  }

  getTagRef(id: string = '') {
    if (id) return this.db.doc('tags/' + id).ref
    throw new Error('id is required')
  }

  getUsers() {
    return new Promise<Array<User>>((resolve, reject): any => {
      this.db.firestore.collection('users').get().then(res => {
        const users: Array<User> = [];
        res.forEach(doc => {
          const user: User = {
            email: doc.id,
            displayName: doc.data().displayName,
            roles: doc.data().roles,
            active: doc.data().active
          }
          users.push(user);
        })
        resolve(users);
      }).catch(err => reject(err));
    })
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

  getTags() {
    return new Promise<Array<Tag>>((resolve, reject): any => {
      this.db.firestore.collection('tags').where('active', '==', true).get().then(docs => {
        const tags: Array<Tag> = []
        docs.forEach(doc => tags.push(new Tag({
          id: doc.id,
          name: doc.data().name,
          active: doc.data().active
        })))
        return resolve(tags)
      }).catch(err => reject(err))
    })
  }

  editSkill(id: string, data) {
    return new Promise<any>((resolve, reject): any => {
      this.db.firestore.collection('skills').doc(id).update(data)
        .then(respuesta => {
          resolve(respuesta);
        }).catch(error => {
        reject(error);
      });
    });
  }

  getSkillsByTag(tag: Tag) {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('skills').get().then(docs => {
        const res: Array<SkillName> = []
        docs.forEach(doc => {
          if (doc.data().tags && doc.data().tags.map(t => t.ref.id).includes(tag.id)) {
            res.push(new SkillName({ id: doc.id, ...doc.data() }))
          }
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }
}
