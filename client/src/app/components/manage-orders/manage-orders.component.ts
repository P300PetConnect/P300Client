import { Component, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
import { IOrder, IUser } from '../interfaces/form';
import { IPetOwner, IPetSitter } from '../interfaces/users';
import { OrderComponent } from '../order/order.component';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';

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
  petSitter: IPetSitter;
  userGroup: any;
  petOwner: IPetOwner; 

  constructor(private _httpOrder:OrderService,private dialog:MatDialog, public authenticator: AuthenticatorService, private _httpUser: UserService) {
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

    this.getOrders(); 

  
   }

   async getOrders(){
    this.petSitter = JSON.parse(localStorage.getItem('PetSitter')); 
    if(this.userGroup =="PetSitter"){
      // this._httpUser.get_petsitter(this.authenticator?.user?.attributes?.email).subscribe(
        // async petSitter=>{
          // this.petSitter = petSitter;
          const orders = await this._httpOrder.getOderByUser(36).toPromise()
          this.orders = orders;
          console.log('test', this.orders); 
          console.log(this.petSitter)
          console.log('pets itter id ', this.petSitter?.petSitterId); 

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

  // async getOrders() {
  //   //IF Pet Sitter
  //   const orders = await this._httpOrder.getOderByUser(36).toPromise()
  //   this.orders = orders;
  //   console.log('Orders', this.orders);
  // }

  onCreateOrder(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(OrderComponent, dialogConfig); 
  
  }


}
