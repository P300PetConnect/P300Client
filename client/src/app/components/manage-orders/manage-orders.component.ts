import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { IOrder } from '../interfaces/form';
import { IPetOwner } from '../interfaces/users';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  
  panelOpenState = false;
  panelOpenState2 = false; 
  orders:IOrder[]=[]; 

  ordesTest:any; 
  i: number; 
  client: IPetOwner; 
  
  constructor(private _httpOrder:OrderService, public authenticator: AuthenticatorService, private _httpUser: UserService) {
   }

  async ngOnInit(): Promise<void> {
   const data = await this.getOrders(); 
}

  GetClientDetails(email:string){
    this._httpUser.get_petowner(email).subscribe(client => this.client = client);
    console.log('Client',JSON.stringify((this.client)))
  }

  getOrders(){
    this._httpOrder.getOderByUser(this.authenticator?.user?.attributes?.email).subscribe(orders => this.orders = orders);
    console.log('Orders',JSON.stringify((this.orders)))

   }


}
