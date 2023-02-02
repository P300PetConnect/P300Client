import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
//import Amplify, { Auth } from 'aws-amplify'; 
import { AuthenticatorService } from '@aws-amplify/ui-angular';
//import awsExports from 'src/aws-exports';
import { UserService } from '../service/user.service';
import { IUser } from '../interfaces/form';
import { NavComponent } from '../nav/nav.component';


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
    // Amplify.configure(awsExports);
   
    // Auth.currentAuthenticatedUser()
    // .then(user => {
    //   this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
    // })
    // .catch(err => console.log(err));

  }
  async ngOnInit(){
    // console.log('user group',this.userGroup)

    // this.authenticator.getUserGroup().then(group => {
      // console.log(this.authenticator.user.get);
  // 
  // Auth.currentAuthenticatedUser()
  // .then(user => {
  //   this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
  // })
  // .catch(err => console.log(err));

  //   if(this.authenticator.user){
  //     this._router.navigateByUrl('/user-form');
  //   }

    // if(this.isLogout){
    //   this.authenticator.signOut(); 
    //   console.log(this.authenticator.signOut()); 
    // }
    console.log(this.userGroup); 

}

btnClick= function () {
  this.router.navigateByUrl('inital');
};


}


  




  // async loginWithCognito(){
  //   // try{
  //   //   var user = await Auth.signIn(this.email.toString(), this.password.toString()); 
  //   //   console.log('Authentication performed for user = '+ this.email + 'password ='+this.password); 
  //   //   var tokens =  user.signInUserSession; 
  //   //   if(tokens !=null){
  //   //     console.log('User authentication'); 
  //   //     this.router.navigate(['home']); 
  //   //     alert('Youre logged in successfully !')
  //   //   }
  //   // }catch(error){
  //   //   console.log(error); 
  //   // }
  //   // }

