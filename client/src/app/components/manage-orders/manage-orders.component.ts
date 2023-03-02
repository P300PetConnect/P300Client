import { Component, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
import { ServiceInterface } from 'src/app/search_service_interfaces/service-interface';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';
import { IOrder, IUser } from '../interfaces/form';
import { IPetOwner, IPetSitter } from '../interfaces/users';
import { OrderComponent } from '../order/order.component';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  orders:IOrder[]=[]; 
  clients: any = {}; 
  petOwners: any;
  errorMessage: any;
  message: any;
  petSitter: IPetSitter;
  userGroup: any;
  petOwner: IPetOwner; 
  serviceList:ServiceInterface[] = [];
  userID: string;


  constructor(private _httpOrder:OrderService,private dialog:MatDialog, public authenticator: AuthenticatorService, private _httpUser: UserService,  
    private service: SearchServiceService, private sharedService: SharedService) {
    Auth.currentAuthenticatedUser()
    .then(user => {
      this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
    })
    .catch(err => console.log(err));
  }
   ngOnInit():void{
    Auth.currentAuthenticatedUser()
    .then(user => {
      this.userGroup = user.signInUserSession.accessToken.payload["cognito:groups"][0];
    })
    .catch(err => console.log(err));
       console.log('user group', this.userGroup)

       this.petOwner = JSON.parse(localStorage.getItem('PetOwner')); 
       this.petSitter = JSON.parse(localStorage.getItem('PetSitter')); 

       
    this.getServices(43);
    this.getOrders();   
    this.createOrder(); 
   }

   createOrder() {
    // Call API to create order
    const currentCount = this.sharedService.ordersCount.value;
    this.sharedService.ordersCount.next(currentCount + 1);
  
  }

   async getOrders(){
    if(this.userGroup =="PetSitter"){
      // this._httpUser.get_petsitter(this.authenticator?.user?.attributes?.email).subscribe(
        // async petSitter=>{
          // this.petSitter = petSitter;
          const orders = await this._httpOrder.getOderByUser(this.petSitter?.petSitterId).toPromise()
          this.orders = orders;
        // }); 
        // return false; 
    }
    else if(this.userGroup =="PetOwner"){

      if(!this.petOwner?.petOwnerId){
        this._httpUser.get_petowner(this.authenticator?.user?.attributes?.email).subscribe(
        async petOwner=>{
          this.petOwner = petOwner;
          const orders = await this._httpOrder.getOrderByUserPetOwnerView(this.petOwner?.petOwnerId).toPromise()
          this.orders = orders;
          this.petOwner = JSON.parse(localStorage.getItem('PetOwner')); 
        }); 
        return false;
      }
      else{
        const orders = await this._httpOrder.getOrderByUserPetOwnerView(this.petOwner?.petOwnerId).toPromise()
        this.orders = orders;
        console.log('Pet Owner ID', this.petOwner?.petOwnerId); 
      }
      
    }
    
}

getServices(id: number): boolean
{ 
  this.service.getOtherServices(id).subscribe({
    next: (value: ServiceInterface[] )=> this.serviceList = value,
    complete: () => console.log('Services finished ', this.serviceList),
    error: (mess) => this.message = mess
  })

  return false;

}

  onCreateOrder(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(OrderComponent, {data:{petSitter:this.petSitter, serviceList:this.serviceList}}); 
  }


}
