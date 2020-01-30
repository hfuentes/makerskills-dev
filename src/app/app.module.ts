import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome'

import { environment } from '../environments/environment'
import { LoginComponent } from './login/login.component'
import { LogoutComponent } from './login/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { RestrictedComponent } from './restricted/restricted.component'
import { SkillsChartComponent } from './skills-chart/skills-chart.component'
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { AdminComponent } from './admin/admin.component'
import { SkillsComponent } from './admin/skills/skills.component'
import { ExpsComponent } from './admin/exps/exps.component'
import { UsersComponent } from './admin/users/users.component'
import { LevelsComponent } from './admin/levels/levels.component'
import { UsersProfileComponent } from './users-profile/users-profile.component'
import { UsersSearchComponent } from './users-search/users-search.component'
import { NavbarComponent } from './navbar/navbar.component';
import { SkillsSearchComponent } from './skills-search/skills-search.component';
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    RestrictedComponent,
    SkillsChartComponent,
    ErrorHandlerComponent,
    AdminComponent,
    SkillsComponent,
    ExpsComponent,
    UsersComponent,
    LevelsComponent,
    UsersProfileComponent,
    UsersSearchComponent,
    NavbarComponent,
    SkillsSearchComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
