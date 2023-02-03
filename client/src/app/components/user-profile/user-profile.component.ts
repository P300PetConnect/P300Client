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
import { ReviewService } from 'src/app/Review-services/review.service';
import { Review } from 'src/app/ReviewInterfaces/review';
import { OrderComponent } from '../order/order.component';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';
import { ServiceInterface } from 'src/app/search_service_interfaces/service-interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  
  //make interface for review
  //configure get for reviews
  //leave comments on where further integration is needed. 


  

  public user: IUser; 
  public pet:IPet;
  isReadOnly?:boolean = false; 
  isSelected:boolean = false; 
  isShow:boolean; 
  isPetOwner:boolean = false; 
  public petOwner: IPetOwner; 
  public petSitter: IPetSitter; 
  public petDetails:IPet[]; 

  reviews:Review[] = [];
  serviceList:ServiceInterface[] = [];
  message: any;

  picKeyWords: string[] = ["Feed", "Walk", "Accommodation","Mind"] 

  //hardcoded bools to demo comments 

  comments1 = false;
  comments2 = false;
  comments3 = false;
  comments4 = false;
  com = false;
  showDes = false;

  averageRoundStars: number;

  constructor(private _userService: UserService, private _petService:PetService,
     public authenticator: AuthenticatorService, private dialog:MatDialog, 
     private review:ReviewService,private service: SearchServiceService) {



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
  //     <span *ngFor="let _ of [].constructor(averageRoundStars)" class="bi bi-star-fill"></span>

  getPetSitter(){
    this._userService.get_petsitter("fatherted@gmail.com").subscribe(
      petSitter=>{
        this.petSitter = petSitter;
        console.log(petSitter)
       this.averageRoundStars = Math.floor(this.petSitter.reviewsTotal/ this.petSitter.numReviews);
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

getServices(id: number): boolean
{
  this.service.getOtherServices(id).subscribe({
    next: (value: ServiceInterface[] )=> this.serviceList = value,
    complete: () => console.log('Services finished ' +  JSON.stringify((this.service))),
    error: (mess) => this.message = mess
  })
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
    dialogConfig.data = {myObjectHolder: this.petSitter.petSitterId} ;
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
  getReviews(id: number):boolean
  {
    this.review.getReviews(id).subscribe({
      next: (value: Review[] )=> this.reviews = value,
      complete: () => console.log('Review service finished ' +  JSON.stringify((this.reviews))),
      error: (mess) => this.message = mess
    })
    return false;
  }

  }
