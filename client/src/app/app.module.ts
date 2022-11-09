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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {MatSelectModule} from '@angular/material/select';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchPetServiceComponent } from './components/search-pet-service/search-pet-service.component';
// import {MatMomentDateModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';





// Amplify.configure({
//   Auth:{
//     mandatorySignIn:true, 
//     region:'eu-west-1', 
//     userPoolId:'eu-west-eu-west-1_dkqFlijuX', 
//     userPoolWebCliendId:'1kvja59f1tthl9chrrjn59pgou', 
//     AuthenticatorFlowType:'ALLOW_USER_PASSWORD_AUTH'
import { ForumWallComponent } from './forum-components/forum-wall/forum-wall.component';
import { AddPostComponent } from './forum-components/add-post/add-post.component';
import { PostComponent } from './forum-components/post/post.component';
import { CommentSectionComponent } from './forum-components/comment-section/comment-section.component';

//   }
// })
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    UserProfileComponent,
    ForumWallComponent,
    AddPostComponent,
    PostComponent,
    CommentSectionComponent,
    LoginComponent,
    InitialPageComponent,
    UserformComponent, 
    DialogComponent, UploadImageComponent, SearchPetServiceComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule,
    MatGoogleMapsAutocompleteModule,
    ReactiveFormsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSliderModule,
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    Ng2TelInputModule,
    MatGoogleMapsAutocompleteModule,
    MatListModule,
    MatCardModule,
    MatNativeDateModule,
    MatMenuModule, 
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