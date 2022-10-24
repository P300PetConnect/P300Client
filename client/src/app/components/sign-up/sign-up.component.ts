import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth'; 



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  email: string; 
  password: string; 
  firstName: string; 
  lastName: string; 

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  // register(){
  //   try{
  //     const user = Auth.signUp({
  //       username: this.email, 
  //       password: this.password, 
  //       attributes:{
  //         email: this.email, 
  //         given_name:this.firstName,
  //         family_name: this.lastName, 
  //       }
  //     })
  //     console.log({user})
  //     alert('user signup completed, please check verify your email. '); 
  //     this.router.navigate(['login']); 

  //   }catch(error){
  //     console.log('error signing up: ', error); 
  //   }
  // }
}
