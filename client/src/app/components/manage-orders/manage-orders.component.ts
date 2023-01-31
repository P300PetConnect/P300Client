import { Component, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { IOrder, IUser } from '../interfaces/form';
import { IPetOwner } from '../interfaces/users';
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
  panelOpenState = false;
  panelOpenState2 = false; 
  orders:IOrder[]=[]; 

  ordesTest:any; 
  i: number; 
  clients: any = {}; 
  petOwners: any;
  errorMessage: any;
 openT:string = 'bi bi-plus'
 closeT:string='bi bi-dash'
open: boolean = false; 
  petSitter: import("/Users/jessicahenry/Project300Backup 2/client/src/app/components/interfaces/users").IPetSitter;
  
  constructor(private _httpOrder:OrderService,private dialog:MatDialog, public authenticator: AuthenticatorService, private _httpUser: UserService) {
   }
   ngOnInit():void{
    this.getOrders(); 

   }

  getPetSitter(){
    this._httpUser.get_petsitter(this.authenticator?.user?.attributes?.email).subscribe(
      async petSitter=>{
        this.petSitter = petSitter;
        console.log(petSitter)
        const orders = await this._httpOrder.getOderByUser(  this.petSitter?.petSitterId).toPromise()
        this.orders = orders;
      }); 
      return false; 
    }



  async getOrders() {
    console.log(this.petSitter?.petSitterId); 
    const orders = await this._httpOrder.getOderByUser(36).toPromise()
    this.orders = orders;
    console.log('Orders', this.orders);
  }

  onCreateOrder(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(OrderComponent, dialogConfig); 
  
  }

Test(test:string){
  console.log('Testssss',test); 
}

}
