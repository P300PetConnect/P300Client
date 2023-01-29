import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
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
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { OrderComponent } from '../order/order.component';
import { Review } from 'src/app/ReviewInterfaces/review';
import { ReviewService } from 'src/app/Review-services/review.service';
import { ActivatedRoute } from '@angular/router';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';
import { ServiceInterface } from 'src/app/search_service_interfaces/service-interface';

@Component({
  selector: 'app-pet-sitter-details',
  templateUrl: './pet-sitter-details.component.html',
  styleUrls: ['./pet-sitter-details.component.scss']
})
export class PetSitterDetailsComponent implements OnInit {
  panelOpenState = false;
  panelOpenState2 = false; 
  public user: IUser; 
  public pet:IPet;
  isReadOnly?:boolean = false; 
  isSelected:boolean = false; 
  isShow:boolean; 
  isPetOwner:boolean = false; 
  public petOwner: IPetOwner; 
  public petSitter: IPetSitter; 
  public petDetails:IPet[]; 
  selected: Date | null;
  reviews:Review[] = [];
  serviceList:ServiceInterface[] = [];
  message: any;
  email: string;
  userID: string;

  // array of key words to check for images// 
  picKeyWords: string[] = ["Feed", "Walk", "Accommodation","Mind"] 


  dateFilter: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day == 1; // 1 means monday, 0 means sunday, etc.
  };

  
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    var date = cellDate.getDate();

    console.log(date); 

    // if (view == 'month') {
        return 'highlightCard';
    // }

    // return "";
}


  @ViewChild('picker') picker:ElementRef;

  constructor(private _userService: UserService, private _petService:PetService, public authenticator: AuthenticatorService, 
    private dialog:MatDialog, private renderer: Renderer2,  private review:ReviewService,public r : ActivatedRoute, private service: SearchServiceService) {
 



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

    console.log(this.selected); 
    this.email = this.r.snapshot.paramMap.get('email');
    this.userID = this.r.snapshot.paramMap.get('id');
    //get users services
     this.getServices(Number(this.userID));

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


    // if(this.authenticator?.user?.attributes?.email=="joannasmith@gmail.com"){
    // console.log('test carai')
    // this.getPetOwner(); 
    // this.getPetDetails(); 
    // }
  //  if(this.authenticator?.user?.attributes?.email=="joannasmith@gmail.com"){
    this.getPetSitter(this.email); 
    console.log(this.petSitter);
    // }


console.log('picker', this.picker); 
  }


//getpet owner 
// getPetOwner(){
//   this._userService.get_petowner("joannasmith@gmail.com").subscribe(
//     petOwner=>{
//       this.petOwner = petOwner;
//       console.log(petOwner)
//     }); 
//     return false; 
//   }

onCreateOrder(){
  // this._userService.initializeFormGroup(); 
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = false; 
  dialogConfig.autoFocus = true; 
  dialogConfig.width = "60%";
  this.dialog.open(OrderComponent, dialogConfig); 

}

  getPetSitter(email: string){
    this._userService.get_petsitter(email).subscribe(
      petSitter=>{
        this.petSitter = petSitter;
        console.log(petSitter)
      }); 
      return false; 
    }

//get pets 

  
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

  getReviews(id: number):boolean
  {
    
    this.review.getReviews(id).subscribe({
      next: (value: Review[] )=> this.reviews = value,
      complete: () => console.log('Review service finished ' +  JSON.stringify((this.reviews))),
      error: (mess) => this.message = mess
    })
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



}

/**
 *
 *  getPetDetails(){
  this._petService.get_petdetails("joannasmith@gmail.com").subscribe(
    petDetails=>{
      this.petDetails = petDetails; 
      console.log(petDetails)
    }); 
    return false; 
}

 */
