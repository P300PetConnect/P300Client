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
import { eUserGroup, IPetOwner, IPetSitter } from '../interfaces/users';
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


  
  userGroup: string = localStorage.getItem('userGroup'); 
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
  comments1 = false;
  comments2 = false;
  comments3 = false;
  comments4 = false;
  com = false;
  showDes = false;

  averageRoundStars: number;

  constructor(private _userService: UserService, private _petService:PetService,
     public authenticator: AuthenticatorService, private dialog:MatDialog, 
     private _httpReview:ReviewService,private _httpService: SearchServiceService) {

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


    if(this.userGroup == eUserGroup.PetOwner){
    this.petOwner = JSON.parse(localStorage.getItem('PetOwner')); 
    this.petDetails = JSON.parse(localStorage.getItem('petDetails')); 
    localStorage.setItem('chatUserName', this.user?.emailAddress);

    if(!this.petOwner){
      this.getPetOwner(); 
      this.getPetDetails();
    }
    }
    else if(this.userGroup == eUserGroup.PetSitter){
    this.petSitter = JSON.parse(localStorage.getItem('PetSitter')); 
    this.serviceList = JSON.parse(localStorage.getItem('serviceList')); 
    this.reviews = JSON.parse(localStorage.getItem('reviews')); 

    if (!this.petSitter) {
      this.getPetSitter().then(() => {
        this.getServices();
        this.getReviews();
      });
    }
    }
  }

  async getPetOwner(){
  console.log(localStorage.getItem('PetOwner')); 
  console.log('I am here, requestiong petowner data for the first time')
  try {
  const petOwner = await this._userService.get_petowner(this.authenticator?.user?.attributes?.email).toPromise()
  this.petOwner= petOwner;
  localStorage.setItem('PetOwner', JSON.stringify(this.petOwner)); 

   } catch (error) {
     console.error(error);
   }
}
  async getPetSitter(){
    try{
      const petSitter = await this._userService.get_petsitter(this.authenticator?.user?.attributes?.email).toPromise()
        this.petSitter = petSitter;
        localStorage.setItem('PetSitter', JSON.stringify(this.petSitter)); 
       this.averageRoundStars = Math.floor(this.petSitter.reviewsTotal/ this.petSitter.numReviews);
       
    }catch (error) {
      console.error(error);
    }
  }

  async getPetDetails(){
      try{
        const petDetails =  await this._petService.get_petdetails(this.authenticator?.user?.attributes?.email).toPromise()
        this.petDetails = petDetails; 
        localStorage.setItem('petDetails', JSON.stringify(this.petDetails)); 
        console.log(petDetails)
       }catch (error) {
        console.error(error);
      }
}

async getServices() {
  try{
    await this._httpService.getOtherServices(this.petSitter.id).toPromise().then(
      (value: ServiceInterface[]) => this.serviceList = value,
      (mess) => this.message = mess
 
    ).finally(() => console.log('Services finished ' + JSON.stringify(this._httpService)));
    localStorage.setItem('serviceList', JSON.stringify(this.serviceList)); 
    console.log('pet sitter service ', this.serviceList); 
  }catch (error) {
    console.error(error);
  }
}

async getReviews()
{
  try{
   await this._httpReview.getReviews(this.petSitter?.id).toPromise().then(
    (value: Review[])=> this.reviews = value,
    (mess) => this.message = mess
   ).finally(()=>console.log('Review service finished ' +  JSON.stringify(this.reviews))); 
   localStorage.setItem('reviews', JSON.stringify(this.reviews)); 
   console.log('pet sitter reviews ', this.reviews); 
  }catch(error){
    console.error(error);
  }
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
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(OrderComponent, dialogConfig); 
  }


  }
