import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ForumWallComponent } from './forum-components/forum-wall/forum-wall.component';

const routes: Routes = [
  {
    path:'users/:id', component:UserProfileComponent
  },
  {
    path:'home', component:AppComponent
  },
  {
    path:'forum', component:ForumWallComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
