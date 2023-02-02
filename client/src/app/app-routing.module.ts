import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { CalendarComponent } from './calendar-components/calendar/calendar.component';
import { CognitoGuard } from './cognito.guard';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { LoginComponent } from './components/login/login.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { PetSitterDetailsComponent } from './components/pet-sitter-details/pet-sitter-details.component';
import { SearchVersion2Component } from './components/search-version2/search-version2.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserformComponent } from './components/userform/userform.component';
import { ForumWallComponent } from './forum-components/forum-wall/forum-wall.component';
import { SearchContainerComponent } from './search_service_components/search-container/search-container.component';

const routes: Routes = [
  { path:'users/:id', component:UserProfileComponent },
  { path:'forum', component:ForumWallComponent},
  { path:'login', component:LoginComponent},
  { path:'search', component:SearchContainerComponent },
  { path:'search2', component:SearchVersion2Component },
  { path:'cal', component:CalendarComponent }, 
  { path:'profile', component:UserProfileComponent }, 
  { path:'form', component:UserformComponent }, 
  { path:'initial', component:InitialPageComponent }, 
  { path:'', component:InitialPageComponent }, 
  { path:'login', component:LoginComponent },
  { path:'petsitterdetails', component:PetSitterDetailsComponent },
  { path: 'chat', component:ChatPageComponent }, 
  {path:'orders', component:ManageOrdersComponent} //TODO: ADD USER ID 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
