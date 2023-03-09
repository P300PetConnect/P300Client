import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
//import Amplify, { Auth } from 'aws-amplify'; 
import { AuthenticatorService } from '@aws-amplify/ui-angular';
//import awsExports from 'src/aws-exports';
import { UserService } from '../service/user.service';
import { IUser } from '../interfaces/form';
import { NavComponent } from '../nav/nav.component';
import { IPetOwner, IPetSitter } from '../interfaces/users';


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
userEmail: string;

public petOwner: IPetOwner; 
public petSitter: IPetSitter; 

  constructor(private _router: Router, public authenticator: AuthenticatorService, private userService: UserService ) {
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
    console.log('User Group Is:', this.userGroup);
}

// btnClick= function () {
//   this.router.navigateByUrl('inital');
// };
onCheckRoute(UserGroup:string){
  if(UserGroup == 'PetOwner'){
    localStorage.setItem('userGroup','PetOwner')
    this.getPetOwner();
  }
  else if(UserGroup == 'PetSitter'){
    localStorage.setItem('userGroup','PetSitter')
    this.getPetSitter();
  }
}

//load pet owner data to local storage
async getPetOwner(){
  try {
  const petOwner = await this.userService.get_petowner(this.authenticator?.user?.attributes?.email).toPromise()
  this.petOwner = petOwner;
  localStorage.setItem('userEmail', petOwner.emailAddress);
  this._router.navigateByUrl('search2/search2;service=;location=;pet=');
  } catch (error) {
      console.error(error);
    }
  }

//load pet sitter data to local storage
  async getPetSitter(){
    try{
      const petSitter = await this.userService.get_petsitter(this.authenticator?.user?.attributes?.email).toPromise()
        this.petSitter = petSitter;
        localStorage.setItem('userEmail', petSitter.emailAddress);
        this._router.navigateByUrl('profile');
    }catch (error) {
      console.error(error);
    }
  }

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

