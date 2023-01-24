import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { CognitoGuard } from './cognito.guard';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserformComponent } from './components/userform/userform.component';
import { ForumWallComponent } from './forum-components/forum-wall/forum-wall.component';

const routes: Routes = [
  {
    path:'users/:id', component:UserProfileComponent
  },
  {
        path:'forum', component:ForumWallComponent
  }, 
  {
    path:'profile', component:UserProfileComponent
  }, 
  {
    path:'form', component:UserformComponent
  }, 
  {
    path:'initial', component:InitialPageComponent
  }, 
  {
    path:'login', component:LoginComponent
  },
  {
    path: 'chat', component:ChatPageComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
