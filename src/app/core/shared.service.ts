import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SkillName } from '../core/domain/skill'
import { User, UserTagsSearch, UserTagSearch } from './domain/user';
import { Tag, NavSearchTag } from './domain/tag';
import * as firebase from 'firebase'
import { Comment, CommentForm } from './domain/comment';

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
          users.push(new User({
            email: doc.id,
            displayName: doc.data().displayName,
            roles: doc.data().roles,
            active: doc.data().active
          }));
        })
        resolve(users);
      }).catch(err => reject(err));
    })
  }

  addUser(user: User) {
    return new Promise<any>((resolve, reject): any => {
      if (user.email && user.roles) {
        return this.db.firestore.collection('users').doc(user.email).get().then(doc => {
          if (doc.exists) return reject({ type: 'user-exists' })
          return this.db.firestore.collection('users').doc(user.email).set({
            displayName: user.displayName,
            active: user.active,
            roles: user.roles
          })
        }).then(res => resolve(res)).catch(err => reject(err));
      } else return reject()
    });
  }

  editUser(user: User, data: any) {
    return new Promise<any>((resolve, reject): any => {
      if (user && user.email && data) {
        return this.db.firestore.collection('users').doc(user.email).update(data)
          .then(res => {
            return resolve(res);
          }).catch(error => {
            return reject(error);
          })
      } else return reject()
    })
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

  getUsersByTag(tags: Array<NavSearchTag> = []) {
    return new Promise<any>((resolve, reject) => {
      const res: Array<UserTagsSearch> = []
      if (tags && tags.length > 0) {
        return this.db.firestore.collection('users')
          .where('active', '==', true).get().then(docs => {
            if (docs && !docs.empty) {
              docs.forEach(doc => {
                if (doc.data().skills && doc.data().skills.length > 0 && tags.map(x => x.tag.id).every(x =>
                  doc.data().skills
                    .filter(y => y.tags && y.tags.length > 0)
                    .map(y => y.tags).flat()
                    .map(y => y.ref.id)
                    .filter((v, i, s) => s.indexOf(v) === i)
                    .indexOf(x) >= 0
                )) {
                  res.push(new UserTagsSearch({
                    user: new User({
                      email: doc.id,
                      displayName: doc.data().displayName,
                      photoURL: doc.data().photoURL
                    }),
                    tags: tags.map(x => {
                      return new UserTagSearch({
                        tag: x.tag,
                        bg: x.bg,
                        avgLevels: (() => {
                          const levels = doc.data().skills
                            .filter(y => y.tags && y.tags.length > 0 && y.tags.some(z => z.ref.id === x.tag.id))
                            .map(y => y.level)
                          return levels.reduce((p, c) => c += p) / levels.length
                        })(),
                        weight: x.weight
                      })
                    })
                  }))
                }
              })
            }
            // sort by rating
            return resolve(res.sort((x, y) => {
              if (x.rating > y.rating) return -1
              if (x.rating < y.rating) return 1
              return 0
            }))
          }).catch(err => reject(err))
      } else {
        return resolve(res)
      }
    })
  }

  getComments() {
    return new Promise<Array<Comment>>((resolve, reject) => {
      return this.db.firestore.collection('comments')
        .orderBy('createdAt', 'desc')
        .limit(200)
        .get().then(docs => {
          const comments: Array<Comment> = []
          docs.forEach(doc => comments.push(new Comment({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().name,
            createdAt: doc.data().createdAt.toDate(),
            comment: doc.data().comment
          })))
          return resolve(comments)
        }).catch(err => reject(err))
    })
  }

  saveComment(comment: CommentForm) {
    return new Promise((resolve, reject) => {
      return this.db.firestore.collection('comments').add({
        email: comment.user.email,
        name: comment.user.displayName,
        comment: comment.comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(res => resolve(res)).catch(err => reject(err))
    })
  }
}
