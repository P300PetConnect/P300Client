import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import  Amplify, {Auth } from 'aws-amplify';
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig); 
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
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
import { UserformComponent } from './components/userform/userform.component';
import { CognitoGuard } from './cognito.guard';
import { UserService } from './components/service/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertmsgComponent } from './components/alertmsg/alertmsg.component';  
import { DialogComponent } from './components/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {   environment} from '../environments/environment'; 
import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
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
    UserformComponent, 
    AlertmsgComponent, 
    DialogComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule,
    MatGoogleMapsAutocompleteModule,
    FlexLayoutModule,
    MatSliderModule,
    MatTabsModule,
    MatGoogleMapsAutocompleteModule,
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
    NgbModule, 

    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),

  ],
  providers: [AuthenticatorService, CognitoGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}