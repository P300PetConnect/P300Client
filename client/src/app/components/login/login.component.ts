import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // email: string = '';
  // password: string = ''; 
  constructor( private router: Router) { }

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
