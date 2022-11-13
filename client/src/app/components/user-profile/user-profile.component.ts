import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/service/data.service';
import { IUser } from 'src/app/components/interfaces/form';
import { Data } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SharedFormComponent } from 'src/app/components/shared-form/shared-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  public user: IUser; 
  isReadOnly?:boolean = false; 
  isSelected:boolean = false; 

  isShow:boolean; 
  constructor(private _userService: UserService,  public authenticator: AuthenticatorService, private dialog:MatDialog, 
) {

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
    console.log(this.authenticator.user);
  }

  onCreate(){
    // this._userService.initializeFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = false; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(SharedFormComponent, dialogConfig)

  }

}
