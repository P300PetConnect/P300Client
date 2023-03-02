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
import { INotAvailable, IOrderList } from '../interfaces/order';
import { OrderService } from '../service/order.service';
import { SharedService } from '../shared.service';

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
  orders:IOrderList[] = [];
  notAvailble:INotAvailable[] = [];
  serviceList:ServiceInterface[] = [];
  message: any;
  picKeyWords: string[] = ["Feed", "Walk", "Sitting","Grooming"] 
  comments1 = false;
  comments2 = false;
  comments3 = false;
  comments4 = false;
  com = false;
  showDes = false;
  notAvailable = false;

  componentFlag = "userProfile"

  averageRoundStars: number;

  constructor(private _userService: UserService, private _petService:PetService,
     public authenticator: AuthenticatorService, private dialog:MatDialog, 
     private _httpReview:ReviewService,private _httpService: SearchServiceService, private _order: OrderService, private sharedService: SharedService) {

   }

   myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  
  ngOnInit(): void {

    if(this.userGroup == eUserGroup.PetOwner){
    // this.petOwner = JSON.parse(localStorage.getItem('PetOwner')); 
    // this.petDetails = JSON.parse(localStorage.getItem('petDetails'));

    // if(!this.petOwner.emailAddress){
      this.getPetOwner(); 
      this.getPetDetails();
 // Example function to update orders count
 this.sharedService.ordersCount.next(10);    // }
    }
    else if(this.userGroup == eUserGroup.PetSitter){
      console.log('PetSitter',this.petSitter);

    this.petSitter = JSON.parse(localStorage.getItem('PetSitter')); 
    this.serviceList = JSON.parse(localStorage.getItem('serviceList')); 
    this.reviews = JSON.parse(localStorage.getItem('reviews')); 

    // get orders for schedule 
    this.GetOrders(this.petSitter?.petSitterId);
    this.GetnotAvailable(this.petSitter?.id);

    //check if the service list is not read

    this.averageRoundStars = Math.floor(this.petSitter?.reviewsTotal/ this.petSitter?.numReviews);

    // if (this.petSitter.emailAddress==null) {
      this.getPetSitter().then(() => {
        this.getServices();
        this.getReviews();
      });
    // }
    }
    
  }

  GetOrders(id: number) {
    this._order.getOrdersList(id).subscribe({
      next: (value: IOrderList[]) => {
        this.orders = value;
        console.log('Order service finished ', this.orders);
  
        // Find all orders that haven't been read by the pet sitter
        const ordersNotRead = this.orders.filter(order => !order.FlagReadPetSitter);
  
        // Store the list of unread orders in local storage
        localStorage.setItem('OrdersNotRead', JSON.stringify(ordersNotRead));
  
        if (ordersNotRead.length > 0) {
          console.log('Pet sitter has not read some orders yet.');
        } else {
          console.log('Pet sitter has read all orders.');
        }
      },
      error: (mess) => this.message = mess
    });
  }
  

  

  GetnotAvailable(id: number)
  {
    this._order.getNotAvailable(id).subscribe({
      next: (value: INotAvailable[] )=>this.notAvailble = value,
      complete: () => console.log('not available service finished ', this.notAvailble),
      error: (mess) => this.message = mess
    })
  }

  async getPetOwner(){
  // console.log(localStorage.getItem('PetOwner')); 
  console.log('I am here, requestiong petowner data for the first time')
  try {
  const petOwner = await this._userService.get_petowner(this.authenticator?.user?.attributes?.email).toPromise()
  this.petOwner= petOwner;
  // localStorage.setItem('PetOwner', JSON.stringify(this.petOwner)); 

   } catch (error) {
     console.error(error);
   }
}
  async getPetSitter(){
    try{
      const petSitter = await this._userService.get_petsitter(this.authenticator?.user?.attributes?.email).toPromise()
        this.petSitter = petSitter;
        // localStorage.setItem('PetSitter', JSON.stringify(this.petSitter)); 
        this.averageRoundStars = Math.floor(this.petSitter?.reviewsTotal/ this.petSitter?.numReviews);
    }catch (error) {
      console.error(error);
    }
  }

  async getPetDetails(){
      try{
        const petDetails =  await this._petService.get_petdetails(this.authenticator?.user?.attributes?.email).toPromise()
        this.petDetails = petDetails; 
        // localStorage.setItem('petDetails', JSON.stringify(this.petDetails)); 
        console.log(petDetails)
       }catch (error) {
        console.error(error);
      }
}
async getServices() {
  try{
    await this._httpService.getOtherServices(this.petSitter.id).toPromise().then(
      (value: any[]) => this.serviceList = value,
      (mess) => this.message = mess
    ).finally(() => console.log('Services finished'));
    // localStorage.setItem('serviceList', JSON.stringify(this.serviceList)); 
    console.log('pet sitter service ', this.serviceList); 
  } catch (error) {
    console.error(error);
  }
}

async getReviews()
{
  try{
   await this._httpReview.getReviews(this.petSitter?.id).toPromise().then(
    (value: Review[])=> this.reviews = value,
    (mess) => this.message = mess
   ).finally(()=>console.log('Review service finished ', this.reviews)); 
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

  close()
  {

    this.notAvailable = false;
  }

  }
