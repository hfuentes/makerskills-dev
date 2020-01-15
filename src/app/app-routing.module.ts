import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { SkillsComponent } from './admin/skills/skills.component';
import { LevelsComponent } from './admin/levels/levels.component';
import { ExpsComponent } from './admin/exps/exps.component';


const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['profile'] } },
  { path: 'login', component: LoginComponent },
  { path: 'restricted', component: RestrictedComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['profile'] } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
