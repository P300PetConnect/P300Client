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
import { UserService } from './components/service/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertmsgComponent } from './components/alertmsg/alertmsg.component';  
import { DialogComponent } from './components/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment} from '../environments/environment'; 
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
import { SearchpositivekeywordsComponent } from './components/search-pet-service/search-pet-service.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { ForumWallComponent } from './forum-components/forum-wall/forum-wall.component';
import { AddPostComponent } from './forum-components/add-post/add-post.component';
import { PostComponent } from './forum-components/post/post.component';
import { CommentSectionComponent } from './forum-components/comment-section/comment-section.component';
import { SharedFormComponent } from './components/shared-form/shared-form.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PetComponent } from './components/pet/pet.component';
import { PetSitterServiceComponent } from './components/pet-sitter-service/pet-sitter-service.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MessageAlertComponent } from './components/message-alert/message-alert.component';

// import { MdInputModule } from '@angular/material';


// Amplify.configure({
//   Auth:{
//     mandatorySignIn:true, 
//     region:'eu-west-1', 
//     userPoolId:'eu-west-eu-west-1_dkqFlijuX', 
//     userPoolWebCliendId:'1kvja59f1tthl9chrrjn59pgou', 
//     AuthenticatorFlowType:'ALLOW_USER_PASSWORD_AUTH'


import { SearchContainerComponent } from './search_service_components/search-container/search-container.component';
import { PopServiceCardComponent } from './search_service_components/pop-service-card/pop-service-card.component';
import { BottomInfoComponent } from './search_service_components/bottom-info/bottom-info.component';
import { SearchResultsComponent } from './search_service_components/search-results/search-results.component';
import { OtherServicesComponent } from './search_service_components/other-services/other-services.component';
import { CalendarComponent } from './calendar-components/calendar/calendar.component';
import { ChunkPipe } from './calender-pipe/chunk.pipe';




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
    AlertmsgComponent, 
    DialogComponent, UploadImageComponent, SearchpositivekeywordsComponent, SharedFormComponent, SettingsComponent, PetComponent, 
    PetSitterServiceComponent, MessageAlertComponent, SearchContainerComponent, PopServiceCardComponent,SearchContainerComponent,BottomInfoComponent,SearchResultsComponent, OtherServicesComponent, CalendarComponent, ChunkPipe
    
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule,
    MatChipsModule,
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
    MatExpansionModule,
    Ng2TelInputModule,
    MatGoogleMapsAutocompleteModule,
    MatListModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
    MatNativeDateModule,
    MatMenuModule, 
    MatDialogModule,
    MatStepperModule,
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
  bootstrap: [AppComponent], 
  entryComponents:[SharedFormComponent, PetComponent, PetSitterServiceComponent, MessageAlertComponent], 
})
export class AppModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}