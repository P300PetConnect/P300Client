import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/service/user.service';
import { IUser, IPet} from 'src/app/components/interfaces/form';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SharedFormComponent } from 'src/app/components/shared-form/shared-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PetComponent } from '../pet/pet.component';
import { PetSitterServiceComponent } from '../pet-sitter-service/pet-sitter-service.component';
import { IPetOwner, IPetSitter } from '../interfaces/users';
import { PetService } from '../service/pet.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  
  public user: IUser; 
  public pet:IPet;
  isReadOnly?:boolean = false; 
  isSelected:boolean = false; 
  isShow:boolean; 
  isPetOwner:boolean = false; 
  public petOwner: IPetOwner; 
  public petSitter: IPetSitter; 
  public petDetails:IPet[]; 

  constructor(private _userService: UserService, private _petService:PetService, public authenticator: AuthenticatorService, private dialog:MatDialog) {



  //   this._userService.get_user().subscribe((res: IUser) => {
  //     this.user= res; 

  //     console.log(this.user.emailAddress)
  //   })
   }

   myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  
  ngOnInit(): void {

this.pet = {
  "name": "Lucy",
  "description": "She snores when sleeps",
  "petImageUrl": "https://img.freepik.com/free-photo/pug-dog-isolated-white-background_2829-11416.jpg?w=2000",
  "dob": "2018-03-21",
  "petType":"Dog",
  "petBreed": "Pug",
  "PetSize": "Small", 
  "createdDate":"12/09/2022", 
}

    if(this.authenticator?.user?.attributes?.email=="joannasmith@gmail.com"){
    console.log('test carai')
    this.getPetOwner(); 
    this.getPetDetails(); 
    }
    else if(this.authenticator?.user?.attributes?.email=="fatherted@gmail.com"){
    this.getPetSitter(); 
    console.log(this.petSitter);
    }



  }


//getpet owner 
getPetOwner(){
  this._userService.get_petowner("joannasmith@gmail.com").subscribe(
    petOwner=>{
      this.petOwner = petOwner;
      console.log(petOwner)
    }); 
    return false; 
  }

  getPetSitter(){
    this._userService.get_petsitter("fatherted@gmail.com").subscribe(
      petSitter=>{
        this.petSitter = petSitter;
        console.log(petSitter)
      }); 
      return false; 
    }

//get pets 
getPetDetails(){
  this._petService.get_petdetails("joannasmith@gmail.com").subscribe(
    petDetails=>{
      this.petDetails = petDetails; 
      console.log(petDetails)
    }); 
    return false; 
}

  
  onCreate(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(SharedFormComponent, dialogConfig); 

  }
  onCreatePet(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(PetComponent, dialogConfig)
  }
  onCreateService(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = false; 
    dialogConfig.width = "80%";
     dialogConfig.height = "93%";
    this.dialog.open(PetSitterServiceComponent, dialogConfig)
  }
  onCreateOrder(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(OrderComponent, dialogConfig); 

  }

}
