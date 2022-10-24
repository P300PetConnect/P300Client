import { Component, OnInit } from '@angular/core';
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

  // email: string = '';
  // password: string = ''; 
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
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
  }
