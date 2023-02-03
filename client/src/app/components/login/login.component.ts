import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
//import Amplify, { Auth } from 'aws-amplify'; 
import { AuthenticatorService } from '@aws-amplify/ui-angular';
//import awsExports from 'src/aws-exports';
import { UserService } from '../service/user.service';
import { IUser } from '../interfaces/form';
import { NavComponent } from '../nav/nav.component';
import { eUserType, IPetOwner, IPetSitter } from '../interfaces/users';
import { Auth } from 'aws-amplify';
import { ThemeService } from 'stream-chat-angular';


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
petOwner: IPetOwner;
petSitter: IPetSitter; 
averageRoundStars: number;
PetSitterProfile: boolean = false;
PetOwnerProfile: boolean = false; 


  constructor(private _router: Router, public authenticator: AuthenticatorService, private _httpUserService: UserService ) {
    Auth.currentAuthenticatedUser()
    .then(user => {
      this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
      localStorage.setItem('UserGroup', JSON.stringify(this.userGroup)); 
    })
    .catch(err => console.log(err));

  }

 ngOnInit(){
    if(this.userGroup =='PetOwner'){
     this.getPetOwner(); 
     alert(this.userGroup); 

      }
      else if(this.userGroup==eUserType.PetSitter){
     this.getPetSitter(); 
      alert(this.userGroup); 
    }

    console.log(this.petSitter); 
}

async getPetOwner(){
  try {
   const petOwner = await this._httpUserService.get_petowner(this.authenticator?.user?.attributes?.email).toPromise()
   this.petOwner= petOwner;
      localStorage.setItem('PetOwner', JSON.stringify(this.petOwner)); 

    } catch (error) {
      console.error(error);
    }
  }

 async getPetSitter(){
  try{
    const petSitter = await this._httpUserService.get_petsitter(this.authenticator?.user?.attributes?.email).toPromise()
    this.petSitter = petSitter; 
     this.averageRoundStars = Math.floor(this.petSitter.reviewsTotal/ this.petSitter.numReviews);
     localStorage.setItem('PetSitter', JSON.stringify(petSitter)); 
     console.log(this.petSitter, 'My Pet Sitter'); 
     this.PetSitterProfile = true; 

  } catch(error){
      console.error(error); 
  }
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

