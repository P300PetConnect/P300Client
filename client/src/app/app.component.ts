import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ModalConfig } from './components/interfaces/modal.config';
import Amplify from 'aws-amplify';
import awsExports from 'src/aws-exports';
import { Router } from '@angular/router';
// import { AuthenticatorService } from '@aws-amplify/ui-angular';
// import Amplify from 'aws-amplify';
// import awsExports from 'src/aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isAutenticated: boolean; 
  constructor(public _authenticator: AuthenticatorService,public router: Router) {
    if(_authenticator){
      console.log(router); 
    }
}



}
