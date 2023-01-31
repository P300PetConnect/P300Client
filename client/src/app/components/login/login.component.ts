import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify'; 
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import awsExports from 'src/aws-exports';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
formFields: any;
isOpen: boolean = true; 
@Input() isLogout: boolean; 
@ViewChildren('field') allFields;
userGroup: string;

  constructor(private _router: Router, public authenticator: AuthenticatorService ) {
    Amplify.configure(awsExports);
   
    Auth.currentAuthenticatedUser()
    .then(user => {
      this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
    })
    .catch(err => console.log(err));

  }
  async ngOnInit(){
  Auth.currentAuthenticatedUser()
  .then(user => {
    this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
  })
  .catch(err => console.log(err));

    if(this.authenticator.user){
      this._router.navigateByUrl('/user-form');
    }
    console.log(this.userGroup); 

}

btnClick= function () {
  this.router.navigateByUrl('inital');
};

}


  