import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RestrictedComponent } from './restricted/restricted.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    RestrictedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
