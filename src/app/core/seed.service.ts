import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './domain/user';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(private db: AngularFirestore, private shared: SharedService) { }

  //TODO delete seed method
  public populate(): void {

    //Timestamp
    // import * as firebase from 'firebase'
    // firebase.firestore.FieldValue.serverTimestamp()

    /*
    //Init user data
    this.db.collection("users").doc("hector.fuentes@imagemaker.com").set(JSON.parse(JSON.stringify(new User('','Héctor Fuentes',''))))
    this.db.collection("users").doc("alexis.veas@imagemaker.com").set(JSON.parse(JSON.stringify(new User('','Alexis Veas',''))))
    this.db.collection("users").doc("makerskills.dev@gmail.com").set(JSON.parse(JSON.stringify(new User('','Admin',''))))
    */

    /*console.log('.......TAGS................')
    const tags = ['Front', 'UX/UI', 'CX', 'Back', 'Full Stack', 'Devops', 'Agility', 'Data Science']
    for (const tag of tags) {
      this.db.firestore.collection('tags').where('name', '==', tag).get().then(docs => {
        if (docs.empty) this.db.collection('tags').add({name: tag, active: true })
        else {
          let i = 0
          docs.forEach(item => { if (i !== 0) this.db.firestore.collection('tags').doc(item.id).delete(); i++ })
        }
      })
    }*/

    /*this.db.firestore.collection('tags').get().then(tags => {
      const arrTags = []
      tags.forEach(itag => {
        arrTags.push({ name: itag.data().name, id: itag.id })
      })
      console.log('.......SKILLS................')
      const skills = ['React', 'Ruby', 'Spring', 'Azure', 'Hibernate', 'Git', 'jQuery', 'Maven', 'PostgreSQL', 'Oracle Database', 'Node',
        'MongoDB', 'Microsoft SQL Server', '.NET', 'C#', 'Entity Framework', 'HTML', 'Ruby on Rails', 'PHP', 'PL/SQL', 'JavaScript',
        'Android', 'Matlab', 'LINQ', 'ASP.NET', 'Linux', 'C', 'Struts2', 'ASP.NET MVC', 'CSS', 'HTML5', 'JIRA', 'SQL', 'Struts', 'MySQL',
        'Angular 8', 'WCF Services', 'NHibernate', 'Oracle g11', 'Liquibase', 'Firebase', 'GitHub Continuous Integration']
      for (const skill of skills) {
        this.db.firestore.collection('skills').where('name', '==', skill).get().then(docs => {
          if (docs.empty) this.db.collection('skills').add({ name: skill, active: true })
          else {
            let i = 0
            docs.forEach(item => {
              if (false && i === 0 && ['React', 'Angular 8', 'jQuery', 'CSS', 'HTML5'].includes(skill)) {
                this.db.firestore.collection('skills').doc(item.id).update({
                  //const tagsNames = ['Front', 'UX/UI', 'CX', 'Back', 'Full Stack', 'Devops', 'Agility', 'Data Science']
                  tags: [{ name: 'Front', ref: this.shared.getTagRef(arrTags.find(x => x.name === 'Front').id)}]
                })
              }
              if (true && i === 0 && ['Ruby', 'Spring', 'Hibernate', 'Maven', 'Node', '.NET', 'C#', 'Entity Framework', 'LINQ', 'ASP.NET',
              'C', 'Struts2', 'Struts', 'NHibernate', 'Liquibase'].includes(skill)) {
                console.log('skill=' + skills + ',tag=Back')
                this.db.firestore.collection('skills').doc(item.id).update({
                  //const tagsNames = ['Front', 'UX/UI', 'CX', 'Back', 'Full Stack', 'Devops', 'Agility', 'Data Science']
                  tags: [{ name: 'Back', ref: this.shared.getTagRef(arrTags.find(x => x.name === 'Back').id)}]
                })
              }

              //if (i !== 0) this.db.firestore.collection('skills').doc(item.id).delete()
              i++
            })
          }
        })
      }
    })*/

    /*
    //Init skills users data
    const ref = this.db.collection('users').doc('hector.fuentes@imagemaker.com').collection('skills')
    ref.doc('AngularJS').set({exp:{name:'3 Years',value:3},level:{name:'Medium',value:2 }})
    ref.doc('Java 7').set({exp:{name:'2 Years',value:2},level:{name:'Senior',value:3 }})
    ref.doc('React').set({exp:{name:'1 Years',value:1},level:{name:'Junior',value:1 }})
    ref.doc('Node').set({exp:{name:'2 Years',value:2},level:{name:'Medium',value:2 }})
    ref.doc('PL SQL').set({exp:{name:'1 Years',value:1},level:{name:'Medium',value:2 }})
    ref.doc('MongoDB').set({exp:{name:'1 Years',value:1},level:{name:'Junior',value:1 }})
    ref.doc('JasperReports').set({exp:{name:'1 Years',value:1},level:{name:'Medium',value:2 }})
    ref.doc('JavaScript').set({exp:{name:'4 Years',value:4},level:{name:'Senior',value:3 }})
    */

    /*
    //Init skills data
    const ref = this.db.collection('skills')
    ref.doc('AngularJS').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    ref.doc('Java 7').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    ref.doc('React').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    ref.doc('Node').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    ref.doc('PL SQL').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    ref.doc('MongoDB').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    ref.doc('JasperReports').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    ref.doc('JavaScript').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
    */

    /*
    //Init full user
    this.db.collection("users").doc("gabriel.torres@imagemaker.com").set({email:'gabriel.torres@imagemaker.com',
    displayName:'Gabriel Torres',photoURL:'',roles:{admin:false, profile: true}}).then(() => {
      const skillsRef = this.db.collection('skills')
      skillsRef.doc('Sketch').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      skillsRef.doc('Bootstrap').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      skillsRef.doc('HTML5').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      skillsRef.doc('CSS3').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      skillsRef.doc('Illustrator').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      skillsRef.doc('Photoshop').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      skillsRef.doc('Adobe Fireworks').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      skillsRef.doc('JQuery').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp()})
      const userSkillsRef = this.db.collection('users').doc('gabriel.torres@imagemaker.com').collection('skills')
      userSkillsRef.doc('Sketch').set({exp:{name:'3 Years',value:3},level:{name:'Medium',value:2}})
      userSkillsRef.doc('Bootstrap').set({exp:{name:'2 Years',value:2},level:{name:'Senior',value:3}})
      userSkillsRef.doc('HTML5').set({exp:{name:'1 Years',value:1},level:{name:'Junior',value:1}})
      userSkillsRef.doc('CSS3').set({exp:{name:'2 Years',value:2},level:{name:'Medium',value:2}})
      userSkillsRef.doc('Illustrator').set({exp:{name:'1 Years',value:1},level:{name:'Medium',value:2}})
      userSkillsRef.doc('Photoshop').set({exp:{name:'1 Years',value:1},level:{name:'Junior',value:1}})
      userSkillsRef.doc('Adobe Fireworks').set({exp:{name:'1 Years',value:1},level:{name:'Medium',value:2}})
      userSkillsRef.doc('JQuery').set({exp:{name:'4 Years',value:4},level:{name:'Senior',value:3}})
    })
    */
    //Init skills
    /*const skillsRef = this.db.collection('skills')
    skillsRef.doc('AngularJS').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Java 7').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('React').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Node').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('PL SQL').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('MongoDB').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('JasperReports').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('JavaScript').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Sketch').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Bootstrap').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('HTML5').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('CSS3').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Illustrator').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Photoshop').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Adobe Fireworks').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('JQuery').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})*/
    //Init levels
    /*const levelsRef = this.db.firestore.collection('levels')
    levelsRef.doc('Junior').set({value:1,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    levelsRef.doc('Medium').set({value:2,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    levelsRef.doc('Senior').set({value:3,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    //Init exps
    const expsRef = this.db.firestore.collection('exps')
    expsRef.doc('1 Year').set({value:1,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('2 Years').set({value:2,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('3 Years').set({value:3,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('4 Years').set({value:4,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('5 Years').set({value:5,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('6 Years').set({value:6,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('7 Years').set({value:7,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('8 Years').set({value:8,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('9 Years').set({value:9,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    expsRef.doc('10 Years').set({value:10,valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})*/

    // Seed: Lionel Olavarría
    /*this.db.collection("users")
    .doc("lionel.olavarria@imagemaker.com")
    .set({
      displayName:'Lionel Olavarría',
      photoURL:'https://www.google.com/s2/u/1/photos/public/AIbEiAIAAABECL_Y97nQ8vKloAEiC3ZjYXJkX3Bob3RvKigzMDJkODcyNzU5Nzg3ZWI5YmNlY'+
      'jIyYjNiZWRkNTYzNTE1YzI5MmRkMAFn7J1zro-G1LoyADPT8ohHw7X0WQ',
      roles:{admin:true,profile:true},active:true
    })
    const skillsRef = this.db.collection('skills')
    skillsRef.doc('Business Strategy').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Entrepreneurship').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Mobile Applications').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Business Intelligence').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('SOA').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Sales').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Information Security').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Software Project Management').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),
      roles:{admin:true}})
    skillsRef.doc('Web Services').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Software Engineering').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Architecture').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Strategic Planning').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Software Development').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Business Management').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Herramientas y tecnologías').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('UML').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('JavaScript').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Weblogic').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Java EE').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Aptitudes interpersonales').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Team Leadership').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Otras aptitudes ').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Service-Oriented Architecture (SOA)').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),
      roles:{admin:true}})
    skillsRef.doc('Mobile Internet').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})
    skillsRef.doc('Agility').set({valid:true,created:firebase.firestore.FieldValue.serverTimestamp(),roles:{admin:true}})*/

    /*Math.floor(Math.random() * 3)
    const exps = [
      {name:'1 Years',value: 1},
      {name:'2 Years',value: 2},
      {name:'3 Years',value: 3},
      {name:'4 Years',value: 4},
      {name:'5 Years',value: 5},
      {name:'6 Years',value: 6},
      {name:'7 Years',value: 7}]
    const levels = [
      {name:'Junior',value:1},
      {name:'Medium',value:2},
      {name:'Senior',value:3}]
    const userSkillsRef = this.db.collection('users').doc('lionel.olavarria@imagemaker.com').collection('skills')
    userSkillsRef.doc('Business Strategy').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Entrepreneurship').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Mobile Applications').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Business Intelligence').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('SOA').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Sales').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Information Security').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Software Project Management').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Web Services').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Software Engineering').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Architecture').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Strategic Planning').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Software Development').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Business Management').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Herramientas y tecnologías').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('UML').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('JavaScript').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Weblogic').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Java EE').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Aptitudes interpersonales').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Team Leadership').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Otras aptitudes ').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Service-Oriented Architecture (SOA)').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Mobile Internet').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})
    userSkillsRef.doc('Agility').set({
      exp:exps[Math.floor(Math.random()*exps.length)],level:levels[Math.floor(Math.random()*levels.length)]})*/

    /*const tagsData = [
      { name: 'FrontEnd', id: '' },
      { name: 'BackEnd', id: '' },
      { name: 'BD', id: '' },
      { name: 'Control versiones', id: '' },
      { name: 'Agility', id: '' },
      { name: 'Data Science', id: '' },
      { name: 'Full Stack .Net', id: '' },
      { name: 'Full Stack Java', id: '' },
      { name: 'Lenguages', id: '' },
      { name: 'Mobile', id: '' },
      { name: 'Programming Paradigms', id: '' },
      { name: 'CI/CD	UX/UI', id: '' }
    ]
    const tagsRef = this.db.firestore.collection('tags')
    tagsData.forEach(tagData => {
      tagsRef.add({ name: tagData.name, active: true }).then(doc => console.log(JSON.stringify({ id: doc.id, name: tagData.name})))
    })*/

    //if (true) return


    /*const tagsData = {
      FrontEnd: { ref: this.shared.getTagRef('7HZC7dXo08oILaJRT1LK'), name: 'FrontEnd' },
      BackEnd: { ref: this.shared.getTagRef('B7Gv3hCSXCmH0NCvf6um'), name: 'BackEnd' },
      BD: { ref: this.shared.getTagRef('4SJUlDcaxNoOXIz22GSv'), name: 'BD' },
      'Control versiones': { ref: this.shared.getTagRef('Nh2ftmus2pkb3uSten5h'), name: 'Control versiones' },
      Agility: { ref: this.shared.getTagRef('PLvwXiGZAIMQ2SkDwQbp'), name: 'Agility' },
      'Data Science': { ref: this.shared.getTagRef('9EC2LMOyD58FuwexNBhO'), name: 'Data Science' },
      'Full Stack .Net': { ref: this.shared.getTagRef('lIOR8Er78ftoRZ9fePdv'), name: 'Full Stack .Net' },
      'Full Stack Java': { ref: this.shared.getTagRef('u73vVW7OKw8W4Ai4NVOY'), name: 'Full Stack Java' },
      Lenguages: { ref: this.shared.getTagRef('pNDLuKppGF0q1L68MkWB'), name: 'Lenguages' },
      Mobile: { ref: this.shared.getTagRef('mf3ZzixwIMQMKUfh0EAA'), name: 'Mobile' },
      'Programming Paradigms': { ref: this.shared.getTagRef('DWFZFqpmfLDof5bF6ZGi'), name: 'Programming Paradigms' },
      'CI/CD': { ref: this.shared.getTagRef('72bKRLMw4iXcH2f5BXEk'), name: 'CI/CD' },
      'UX/UI': { ref: this.shared.getTagRef('yh6Z5wd0C1i3oUnuJwcM'), name: 'UX/UI' }
    }


    const skillsData = [
      { skill: '.NET', tag1: 'BackEnd', tag2: 'Full Stack .Net', tag3: '' },
      { skill: '.NET MVC', tag1: 'BackEnd', tag2: 'Full Stack .Net', tag3: '' },
      { skill: 'Android', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Angular', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Angularjs', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'ANT', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'Apache storm', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'ASP.NET', tag1: 'Full Stack .Net', tag2: '', tag3: '' },
      { skill: 'Aspect Oriented', tag1: 'Programming Paradigms', tag2: '', tag3: '' },
      { skill: 'Bamboo', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'Boostrap', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Bower', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'C', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'C#', tag1: 'BackEnd', tag2: 'Full Stack .Net', tag3: '' },
      { skill: 'C++', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Cassandra', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Chinese', tag1: 'Lenguages', tag2: '', tag3: '' },
      { skill: 'Chrome', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Clojure', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Cloudera', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Cordova', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'CouchBase', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'CouchDB', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'CSS', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Directed by Events', tag1: 'Programming Paradigms', tag2: '', tag3: '' },
      { skill: 'Django', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Docker', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'DynamoDB', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Edge', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'ElasticSearh', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Elixir', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'English', tag1: 'Lenguages', tag2: '', tag3: '' },
      { skill: 'Entity Framework', tag1: 'BackEnd', tag2: 'Full Stack .Net', tag3: '' },
      { skill: 'Enzyme', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Firefox', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Flash', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Flask', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Flink', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'French', tag1: 'Lenguages', tag2: '', tag3: '' },
      { skill: 'Fundation', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'German', tag1: 'Lenguages', tag2: '', tag3: '' },
      { skill: 'Git', tag1: 'Control versiones', tag2: 'Full Stack .Net', tag3: 'Full Stack Java' },
      { skill: 'GitFlow', tag1: 'Control versiones', tag2: '', tag3: '' },
      { skill: 'GitLab CI', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'Golang', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Gradle', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'Graphql', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Grunt', tag1: 'FrontEnd', tag2: 'FrontEnd', tag3: '' },
      { skill: 'Hadoop', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Harvest', tag1: 'Control versiones', tag2: '', tag3: '' },
      { skill: 'HPCC', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'HTML5', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Hudson', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'IBM DB2', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'IE 10', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'IE 11', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'IE 6', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'IE 7', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'IE8', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Illustrator', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Informix', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Integration Services', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Ionic', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'iOS', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Jasmine', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Java', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Java 7', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'Java 8', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'JavaScript', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Jboos', tag1: 'Full Stack Java', tag2: '', tag3: '' },
      { skill: 'Jenkins', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'Jest', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'JQuery', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'JSF', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Kanban', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'Karma', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Kettle', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Kotlin', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Kubernetes', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'Lean', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'Less', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Less', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'Liquibase', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Logical Functional', tag1: 'Programming Paradigms', tag2: '', tag3: '' },
      { skill: 'Maerial Design', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Maven', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'Mercurial', tag1: 'Control versiones', tag2: '', tag3: '' },
      { skill: 'Meteor', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Mobile MockUp', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Mocha', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'MockUp', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Mongo', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'MySql', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'NativeScript', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Neo4j', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'NodeJs', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Npm', tag1: 'FrontEnd', tag2: 'BackEnd', tag3: '' },
      { skill: 'Nuget', tag1: 'BackEnd', tag2: 'Full Stack .Net', tag3: '' },
      { skill: 'Object Oriented', tag1: 'Full Stack .Net', tag2: 'Full Stack Java', tag3: 'Programming Paradigms' },
      { skill: 'OpenRifane', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'OpenShift', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'Opera', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Oracle', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'PentaHo', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Phoenix', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'PhoneGap', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Photoshop', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'PL/SQL', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Portuguese', tag1: 'Lenguages', tag2: '', tag3: '' },
      { skill: 'PostgreSQL', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Power Center', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Proactor', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Python', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Qubole', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'React', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'ReactNative', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Redis', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Responsive', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'RethinkBD', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Ruby', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Ruby on Rails', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'RUP', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'Rust', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Safari', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Safe', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'SAP', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Sass', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Scala', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Scrum', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'Servicios WCF', tag1: 'Full Stack .Net', tag2: '', tag3: '' },
      { skill: 'SOAP', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Spanish', tag1: 'Lenguages', tag2: '', tag3: '' },
      { skill: 'Spark', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Spiral', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'Spring', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'Spring Boot', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'Sql Server', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'SqLite', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Statwing', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Structured Imperative', tag1: 'Programming Paradigms', tag2: '', tag3: '' },
      { skill: 'Struts', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'SVN', tag1: 'Control versiones', tag2: '', tag3: '' },
      { skill: 'Swing', tag1: 'BackEnd', tag2: '', tag3: '' },
      { skill: 'Sybase', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'Talent', tag1: 'Data Science', tag2: '', tag3: '' },
      { skill: 'Team Foundation', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'Teradata', tag1: 'BD', tag2: '', tag3: '' },
      { skill: 'TFVC', tag1: 'Control versiones', tag2: '', tag3: '' },
      { skill: 'Tomcat', tag1: 'BackEnd', tag2: 'Full Stack Java', tag3: '' },
      { skill: 'Tortoise', tag1: 'Control versiones', tag2: '', tag3: '' },
      { skill: 'Travis', tag1: 'CI/CD', tag2: '', tag3: '' },
      { skill: 'TypeScript', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'VB.NET', tag1: 'BackEnd', tag2: 'Full Stack .Net', tag3: '' },
      { skill: 'Vuejs', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'WAS', tag1: 'Full Stack Java', tag2: '', tag3: '' },
      { skill: 'Waterfall', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'WebLogic', tag1: 'Full Stack Java', tag2: '', tag3: '' },
      { skill: 'WebPack', tag1: 'FrontEnd', tag2: '', tag3: '' },
      { skill: 'Windows Phone', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Wireframe', tag1: 'UX/UI', tag2: '', tag3: '' },
      { skill: 'Xamarin', tag1: 'Mobile', tag2: '', tag3: '' },
      { skill: 'Xtreme Programming', tag1: 'Agility', tag2: '', tag3: '' },
      { skill: 'Yarn', tag1: 'FrontEnd', tag2: '', tag3: '' }
    ]*/

    /*const skillsRef = this.db.firestore.collection('skills')
    skillsData.forEach(skillData => {
      const skill = { name: skillData.skill, tags: [] }
      if (skillData.tag1 && skillData.tag1 !== '') {
        skill.tags.push({
          name: tagsData[skillData.tag1].name,
          ref: tagsData[skillData.tag1].ref
        })
      }
      if (skillData.tag2 && skillData.tag2 !== '') {
        skill.tags.push({
          name: tagsData[skillData.tag2].name,
          ref: tagsData[skillData.tag2].ref
        })
      }
      if (skillData.tag3 && skillData.tag3 !== '') {
        skill.tags.push({
          name: tagsData[skillData.tag3].name,
          ref: tagsData[skillData.tag3].ref
        })
      }
      if (skill.tags.length === 0) delete skill.tags
      console.log(skill)
      skillsRef.add(skill)
    });*/

    /*const usersRef = this.db.firestore.collection('users')
    usersRef.get().then(docs => {
      docs.forEach(doc => {
        doc.ref.update({ skills: []}).then(() => {
          console.log(doc.id)
        })
      });
    })*/
  }
}
