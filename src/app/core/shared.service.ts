import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { SkillName } from '../core/domain/skill'
import { User, UserItemsSearch, UserItemSearch } from './domain/user'
import { Tag, NavSearchItem } from './domain/tag';
import * as firebase from 'firebase'
import { Comment, CommentForm } from './domain/comment'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  usersCache: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = null
  skillsCache: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = null

  constructor(private db: AngularFirestore) { }

  getSkills() {
    return new Promise<any>((resolve, reject) => {
      this.db.firestore.collection('skills').get().then(docs => {
        const skills: Array<SkillName> = [];
        docs.forEach(doc => {
          skills.push(new SkillName({
            id: doc.id,
            name: doc.data().name,
            active: doc.data().active,
            tags: doc.data().tags
          }))
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
      this.getCollectionSkills().then(docs => {
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

  getCollectionSkills() {
    return new Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>((resolve, reject) => {
      if (this.skillsCache && !this.skillsCache.empty) return resolve(this.skillsCache)
      return this.db.firestore.collection('skills').where('active', '==', true).get().then(docs => {
        this.skillsCache = docs
        resolve(docs)
      }).catch(err => reject(err))
    })
  }

  getCollectionUsers() {
    return new Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>((resolve, reject) => {
      if (this.usersCache && !this.usersCache.empty) return resolve(this.usersCache)
      return this.db.firestore.collection('users').where('active', '==', true).get().then(docs => {
        this.usersCache = docs
        resolve(docs)
      }).catch(err => reject(err))
    })
  }

  getUsersBySearchItem(searchItems: Array<NavSearchItem> = []) {
    return new Promise<any>((resolve, reject) => {
      const res: Array<UserItemsSearch> = []
      if (searchItems && searchItems.length > 0) {
        console.log(searchItems)
        return this.getCollectionSkills().then(docs => {
          searchItems.forEach(searchItem => {
            if (searchItem.item.constructor.name === Tag.name) {
              let count = 0
              docs.forEach(doc => {
                if (doc.data().tags && doc.data().tags.map(t => t.ref.id).includes(searchItem.item.id)) {
                  count++
                }
              })
              searchItem.skillsCount = count
            }
          })
          return this.getCollectionUsers()
        }).then(docs => {
          if (docs && !docs.empty) {
            docs.forEach(doc => {
              if (doc.data().skills && doc.data().skills.length > 0) {
                const oks = []
                searchItems.forEach(searchItem => {
                  if (searchItem.item.constructor.name === Tag.name && (doc.data().skills
                    .filter(x => x.tags && x.tags.length > 0)
                    .map(x => x.tags).flat()
                    .map(x => x.ref.id)
                    .filter((v, i, s) => s.indexOf(v) === i)
                    .indexOf(searchItem.item.id) >= 0)) {
                    oks.push(true)
                  } else if (searchItem.item.constructor.name === SkillName.name && (doc.data().skills
                    .find(x => x.ref.id === searchItem.item.id) !== undefined)) {
                    oks.push(true)
                  } else {
                    oks.push(false)
                  }
                })
                if (oks.every(x => x)) {
                  res.push(new UserItemsSearch({
                    user: new User({
                      email: doc.id,
                      displayName: doc.data().displayName,
                      photoURL: doc.data().photoURL
                    }),
                    items: searchItems.map(searchItem => {
                      return new UserItemSearch({
                        item: searchItem.item.name,
                        bg: searchItem.bg,
                        avgLevels: (() => {
                          if (searchItem.item.constructor.name === Tag.name) {
                            // tag case
                            const levels = doc.data().skills
                              .filter(y => y.tags && y.tags.length > 0 && y.tags.some(z => z.ref.id === searchItem.item.id))
                              .map(y => y.level)
                            return levels.reduce((p, c) => c += p) / searchItem.skillsCount
                          } else if (searchItem.item.constructor.name === SkillName.name) {
                            // skill case
                            return doc.data().skills.find(x => x.ref.id === searchItem.item.id).level
                          } else {
                            console.error('getUsersBySearchItem: item is not tag or skill.')
                            return 0
                          }
                        })(),
                        weight: searchItem.weight
                      })
                    })
                  }))
                }
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
