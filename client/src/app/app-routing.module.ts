import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { CalendarComponent } from './calendar-components/calendar/calendar.component';
import { CognitoGuard } from './cognito.guard';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserformComponent } from './components/userform/userform.component';
import { ForumWallComponent } from './forum-components/forum-wall/forum-wall.component';
import { SearchContainerComponent } from './search_service_components/search-container/search-container.component';

const routes: Routes = [
  {
    path:'users/:id', component:UserProfileComponent
  },
  {
        path:'forum', component:ForumWallComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'search', component:SearchContainerComponent
  },
  {
    path:'cal', component:CalendarComponent
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
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
