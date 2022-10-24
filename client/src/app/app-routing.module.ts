import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path:'users/:id', component:UserProfileComponent},
  {path:'', pathMatch: 'full', redirectTo:'login'},
  { path:'home', component:HomeComponent },
  { path:'login', component:LoginComponent }, 
  { path:'sign-up', component:SignUpComponent }, 

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
