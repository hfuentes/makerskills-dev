import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './domain/user';

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
    this.db.collection("users").doc("hector.fuentes@imagemaker.com").set(JSON.parse(JSON.stringify(new User('','Héctor Fuentes',''))))
    this.db.collection("users").doc("alexis.veas@imagemaker.com").set(JSON.parse(JSON.stringify(new User('','Alexis Veas',''))))
    this.db.collection("users").doc("makerskills.dev@gmail.com").set(JSON.parse(JSON.stringify(new User('','Admin',''))))
    */

    /*console.log('.......SKILLS................')
    const skills = ['React', 'Ruby', 'Spring', 'Azure', 'Hibernate', 'Git', 'jQuery', 'Maven', 'PostgreSQL', 'Oracle Database', 'Node',
      'MongoDB', 'Microsoft SQL Server', '.NET', 'C#', 'Entity Framework', 'HTML', 'Ruby on Rails', 'PHP', 'PL/SQL', 'JavaScript',
      'Android', 'Matlab', 'LINQ', 'ASP.NET', 'Linux', 'C', 'Struts2', 'ASP.NET MVC', 'CSS', 'HTML5', 'JIRA', 'SQL', 'Struts', 'MySQL',
      'Angular 8', 'WCF Services', 'NHibernate', 'Oracle g11', 'Liquibase', 'Firebase', 'GitHub Continuous Integration']
    for (const skill of skills) {
      this.db.firestore.collection('skills').where('name', '==', skill).get().then(docs => {
        if (docs.empty) this.db.collection('skills').add({name: skill, active: true })
        else {
          let i = 0
          docs.forEach(item => { if (i !== 0) this.db.firestore.collection('skills').doc(item.id).delete(); i++ })
        }
      })
    }*/

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
  }
}
