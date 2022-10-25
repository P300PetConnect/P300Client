import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import Amplify, { Auth } from '@aws-amplify/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import  Amplify, {Auth } from 'aws-amplify';
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig); 

import {FormsModule} from '@angular/forms'

import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';

// Amplify.configure({
//   Auth:{
//     mandatorySignIn:true, 
//     region:'eu-west-1', 
//     userPoolId:'eu-west-eu-west-1_dkqFlijuX', 
//     userPoolWebCliendId:'1kvja59f1tthl9chrrjn59pgou', 
//     AuthenticatorFlowType:'ALLOW_USER_PASSWORD_AUTH'

//   }
// })



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    UserProfileComponent,
    LoginComponent,
    InitialPageComponent, 
  ],
  imports: [
    BrowserModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }, 

    }),
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    AmplifyAuthenticatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}