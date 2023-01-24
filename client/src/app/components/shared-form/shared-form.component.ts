import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { IPetOwner, IPetSitter } from '../interfaces/users';


@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss']
})
export class SharedFormComponent implements OnInit {

  email:string = "joannasmith@gmail.com"; 

    userForm : FormGroup = new FormGroup({
    name: new FormControl (''),
    surname: new FormControl (''),
    // dob: new FormControl(''),
    // profilePicUrl: new FormControl(''),
    // mobileNumber: new FormControl(''),
    // emailAddress: new FormControl(''),
    // petOwnerId: new FormControl(''),
    // line1: new FormControl(''),
    // line2: new FormControl(''),
    // city: new FormControl(''),
    // county: new FormControl(''),
    // zipCode: new FormControl(''),
    // country: new FormControl('')
  })


  constructor(public dialogRef:MatDialogRef<SharedFormComponent>, private _userService:UserService, public authenticator: AuthenticatorService) { }

  isSelected:boolean = false; 
  isShow:boolean; 
  // public petOwner: IPetOwner; 
  // public petSitter: IPetSitter; 
  public user: any;
  
  ngOnInit(): void {
    if(this.authenticator?.user?.attributes?.email=="joannasmith@gmail.com"){
      console.log('test carai')
      this.getPetOwner(); 
      }
      else if(this.authenticator?.user?.attributes?.email=="fatherted@gmail.com"){

      this.getPetSitter(); 
      }
  }


  // TO DO - Remove it and pass data from the user profile 
  getPetSitter(){
    this._userService.get_petsitter("fatherted@gmail.com").subscribe(
      petSitter=>{
        this.user = petSitter;
        console.log(this.user)
        
      }); 
      return false; 
    }

//getpet owner 
getPetOwner(){
  this._userService.get_petowner("joannasmith@gmail.com").subscribe(
    petOwner=>{
      this.user = petOwner;
      console.log(petOwner)
    }); 
    return false; 
  }


  onSubmit():boolean{
//TODO - update_petowner
  console.log('forms submitted with ');
  console.table(this.userForm.value);

this._userService.update("joannasmith@gmail.com", this.userForm.value)
.pipe(first())
.subscribe(() =>{
  console.log("user updated")
})
.add(() => console.log("loading false"))

return false; 

//this.onClose(); 
}

  onClose(){
    // this._userService.initializeFormGroup(); 
    this.dialogRef.close(); 
  }




}
