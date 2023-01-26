import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { UserService } from '../service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<OrderComponent>, private _userService:UserService, public authenticator: AuthenticatorService) { }

  ngOnInit(): void {
  }

  onClose(){
    // this._userService.initializeFormGroup(); 
    this.dialogRef.close(); 
  }


}
