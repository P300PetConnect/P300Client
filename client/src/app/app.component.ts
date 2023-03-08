import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ModalConfig } from './components/interfaces/modal.config';
//import Amplify from 'aws-amplify';
//import awsExports from 'src/aws-exports';
import { Router } from '@angular/router';
import { LoaderService } from './components/service/loader.service';
import { UserService } from './components/service/user.service';
import { PetService } from './components/service/pet.service';
import { IPet } from './components/interfaces/form';
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
  public petDetails:IPet[]; 
  petOwner: import("../app/components/interfaces/users").IPetOwner;

  constructor(public _authenticator: AuthenticatorService,private _petService:PetService, private _userService: UserService,public router: Router, public loaderService: LoaderService, public authenticator: AuthenticatorService) {
    if(_authenticator){
      console.log(router); 
    }
  }


  async getPetOwner(){
    // console.log(localStorage.getItem('PetOwner')); 
    console.log('I am here, requestiong petowner data for the first time')
    try {
    const petOwner = await this._userService.get_petowner(this.authenticator?.user?.attributes?.email).toPromise()
    this.petOwner= petOwner;
    localStorage.setItem('PetOwner', JSON.stringify(this.petOwner)); 
     this.getPetDetails(); 

     } catch (error) {
       console.error(error);
     }
  }

  async getPetDetails(){
    try{
      const petDetails =  await this._petService.get_petdetails(this.petOwner?.emailAddress).toPromise()
      this.petDetails = petDetails; 
      console.log(petDetails)
      localStorage.setItem('petDetails', JSON.stringify(this.petDetails));
console.log('Pet Details', this.petDetails); 
     }catch (error) {
      console.error(error);
    }
}

}

