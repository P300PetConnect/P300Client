import { HttpClient } from '@angular/common/http';
import { Component, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';
import { IOrder, IUser } from '../../interfaces/form';
import { EOrderStatus } from '../../interfaces/order';
import { IPetOwner, IPetSitter } from '../../interfaces/users';
import { OrderComponent } from '../order/order.component';
import { OrderService } from '../../service/order.service';
import { UserService } from '../../service/user.service';
import { MessageAlertComponent } from 'src/app/shared-components/message-alert/message-alert.component';
import { OrderProcessingMessagesComponent } from '../order-processing-messages/order-processing-messages.component';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  orders:any[]=[]; 
  clients: any = {}; 
  petOwners: any;
  errorMessage: any;
  petSitter: IPetSitter;
  userGroup: any;
  petOwner: IPetOwner; 
  email: string;
  petsitterisworking: boolean = false;
  orderSelected: IOrder;
  @Output() updateStatus = new EventEmitter<string>();
  starts: any;
  message: { taskName: string; title: string; subtitle: string; btntext1: string; btntext2: string; subtitle1: string; subtitle2: string; subtitle3: string;};

  constructor(private _http: HttpClient, private _httpOrder:OrderService,private dialog:MatDialog,  private _router: Router,public authenticator: AuthenticatorService, private _httpUser: UserService) {
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
       localStorage.setItem('userGroup', this.userGroup);

    this.getOrders(); 
   }

 
   async getOrders(){
    this.petSitter = JSON.parse(localStorage.getItem('PetSitter')); 
    
    if(this.userGroup =="PetSitter"){
      // this._httpUser.get_petsitter(this.authenticator?.user?.attributes?.email).subscribe(
        // async petSitter=>{
          // this.petSitter = petSitter;
          console.log(this.petSitter?.petSitterId); 
          const orders = await this._httpOrder.getOderByUser(this.petSitter?.petSitterId).toPromise()
          this.orders = orders;
          console.log('test', this.orders); 
          console.log(this.petSitter)
          console.log('pets itter id ', this.petSitter?.petSitterId); 
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

startWorking(order:IOrder){ 
  if(order?.Status=='Executing'){
    this.finishWorking(order); 
  }
  else{
    this.onStartAgreed(order); 
  }
}

onStartAgreed(order:IOrder){
  const message={
  taskName:'yesCancel',
  title:'Before Start Order', 
  subtitle:'We are ready to go!', 
  btntext1:'Yes, cancel', 
  btntext2:'No, dont cancel', 
  subtitle1:'The Pet is here with me', 
  subtitle2:'We are ready to go!', 
  subtitle3:'I agree with all policy!'

}
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = true; 
  dialogConfig.autoFocus = false; 
  dialogConfig.width = "30%";
  dialogConfig.height = "40%";
  // const dialogRef = this.dialog.open(OrderProcessingMessagesComponent, dialogConfig); 
  const dialogRef  = this.dialog.open(OrderProcessingMessagesComponent, {data:{ order: order, message: message}})

  dialogRef.componentInstance.startorderdata.subscribe((data) => {
    console.log(data);
    this.starts = data;
    if(this.starts==true){
  this.petsitterisworking=true; 
  order.Status = EOrderStatus.Executing; 
  console.log('the order',order); 
  this._http.put('https://72r8qqly5b.execute-api.eu-west-1.amazonaws.com/dev',order).subscribe(data => {
    console.log('my data',data);
  });
    }
});
}



updateOrderStatus(status: EOrderStatus){
  this.orderSelected.Status = status; 
  this.petsitterisworking=true; 
  console.log('the order', this.orderSelected); 
  this._http.put('https://72r8qqly5b.execute-api.eu-west-1.amazonaws.com/dev', this.orderSelected).subscribe(data => {
    console.log('my data',data);
  });
}

finishWorking(order:IOrder){
  this.onFinishAgreed(order); 
}
onFinishAgreed(order:IOrder){
  const message={
    taskName:'yesCancel',
    title:'Before Finish the Order', 
    subtitle:'Finish it!', 
    btntext1:'Yes, cancel', 
    btntext2:'No, dont cancel', 
    subtitle1:'The Pet with the pet owner', 
    subtitle2:'He is happy!', 
    subtitle3:'I agree with all policy!'
  
  }
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = true; 
  dialogConfig.autoFocus = false; 
  dialogConfig.width = "30%";
  dialogConfig.height = "40%";
  // const dialogRef = this.dialog.open(OrderProcessingMessagesComponent, dialogConfig); 
  const dialogRef  = this.dialog.open(OrderProcessingMessagesComponent, {data:{ order: order, message: message}})

  dialogRef.componentInstance.startorderdata.subscribe((data) => {
    console.log(data);
    this.starts = data;
    if(this.starts==true){
      this.petsitterisworking=false; 
      order.Status = EOrderStatus.Completed; 
      this._http.put('https://72r8qqly5b.execute-api.eu-west-1.amazonaws.com/dev',order).subscribe(data => {
      });
    }
});
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
    this.dialog.open(OrderComponent, {data:{petSitter:this.petSitter}}); 

  }

  GetPetOwnerDetails(userID:number,email:string){
    
    console.log('call pet owner')
    if(this.userGroup =="PetSitter"){
      this._router.navigate(['/petownerprofile', {'id': `${email}`}])
    }
    else if(this.userGroup =="PetOwner"){
        this._router.navigate(['/petsitterdetails', {'id': `${userID}`}])
    }
  }
}


// this.message={
//   taskName:'yesCancel',
//   title:'Are you sure to Cancel this Order? ', 
//   subtitle:'If you cancel this event,it will be permanently cancelled.', 
//   btntext1:'Yes, cancel', 
//   btntext2:'No, dont cancel'}

// const dialogConfig = new MatDialogConfig(); 
// dialogConfig.disableClose = true; 
// dialogConfig.autoFocus = false; 
// dialogConfig.width = "40%";
// dialogConfig.height = "31%";
// this.dialogRef2 = this.dialog.open(MessageAlertComponent, {data:{ order: this.order, message: this.message}
// }); 
// this.dialogRef2.afterClosed().subscribe(result=>{
//   if(result.option=='yesCancel'){
//     if (this.order) {
//       this.order.Status = EOrderStatus.Canceled; 
//       this.order.PaymentStatus = EPaymentStatus.Refounded; 
//       console.log('my roder', this.order)
//       this._http.put('https://72r8qqly5b.execute-api.eu-west-1.amazonaws.com/dev/',this.order).subscribe(data => {
//         console.log('my data',data);
//       });
//     } 
//   }
//   else{
//     this.dialogRef2?.close(); 
//   }
// })