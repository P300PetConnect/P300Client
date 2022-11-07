import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/service/data.service';
import { IUser } from 'src/app/components/interfaces/users';
import { Data } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  public user: IUser; 
  isReadOnly?:boolean = false; 

  constructor(private _userService: UserService,  public authenticator: AuthenticatorService) {
  //   this._userService.get_user().subscribe((res: IUser) => {
  //     this.user= res; 

  //     console.log(this.user.emailAddress)
  //   })
   }


  ngOnInit(): void {
    console.log(this.authenticator.user);
  }
}
