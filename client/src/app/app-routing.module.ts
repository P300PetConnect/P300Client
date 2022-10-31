import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { CognitoGuard } from './cognito.guard';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserformComponent } from './components/userform/userform.component';

 authenticator: AuthenticatorService

const routes: Routes = [
  {path:'user', component:UserProfileComponent},
  {path:'', pathMatch: 'full', redirectTo:'initial'},
  { path:'initial', component:InitialPageComponent},
  { path:'initial/login/petowner', component:LoginComponent},
  { path:'initial/login/petminder', component:LoginComponent},
  { path:'user-form', component:UserformComponent, },
  { path:'login', component:LoginComponent }, 
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
