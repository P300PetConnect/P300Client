import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/service/user.service';
import { IUser, IPet} from 'src/app/components/interfaces/form';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SharedFormComponent } from 'src/app/components/shared-form/shared-form.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public user: IUser; 
  public pet: IPet; 
  isReadOnly?:boolean = false; 
  isSelected:boolean = false; 
  isShow:boolean; 

  constructor(private _userService: UserService,  public authenticator: AuthenticatorService, private dialog:MatDialog) {

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

  //Test data 
  this.user = {
    "name": "Father",
    "surname": "Ted",
    "dob": "20/20/1980",
    "profilePicUrl": "https://i.guim.co.uk/img/media/831ce4428aa017e2d4c9f883be27baeef95ef894/312_237_6076_3644/master/6076.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e0508d322f18a9230080d1edfd8a5315",
    "mobileNumber": "0870915483",
    "emailAddress": "fatherted@gmail.com",
    "petOwnerId": "fatherted@gmail.com"
}
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
