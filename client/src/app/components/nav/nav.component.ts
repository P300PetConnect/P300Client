import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/components/service/user.service';
import { IUser, IPet} from 'src/app/components/interfaces/form';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SharedFormComponent } from 'src/app/components/shared-form/shared-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PetComponent } from '../pet/pet.component';
import { PetSitterServiceComponent } from '../pet-sitter-service/pet-sitter-service.component';
import { IPetOwner, IPetSitter } from '../interfaces/users';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() user: any; 
  public pet: IPet; 
  isLogout:boolean =false; 
  userInfor:any; 

  userEmail: string;
  userGroup: string;
  userFName: string;
  userLName: string;
  userImageUrl: string;
  public petOwner: IPetOwner; 
  public petSitter: IPetSitter; 

  constructor( public authenticator: AuthenticatorService, private readonly  _router: Router, private userService: UserService) {
    // Amplify.configure(awsExports);
  }
  ngOnInit() {
    console.log(this.userEmail);
    this.userGroup = localStorage.getItem('userGroup')
    // console.log(this.authenticator.user); 
    // this.userInfor =this.authenticator.user;

    if(this.userGroup == 'PetOwner'){
      this.getPetOwner();
      console.log('getting owners name', this.userFName);
    }
    else if(this.userGroup == 'PetSitter'){
      this.getPetSitter();
      console.log('getting sitters name', this.userFName);
    }
  }


  @Output()
  public myLogout = new EventEmitter<MouseEvent>();

  async Logout() {
    this.isLogout = true; 
    this.authenticator?.signOut()

    this._router.navigate(['/login'])
    this._router.routeReuseStrategy. shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';

    this.userImageUrl = 'https://cdn-icons-png.flaticon.com/512/172/172163.png';
    this.userFName = '';
    this.userLName = '';
    localStorage.clear();
  }

  async getPetOwner(){
    try {
      const userEmail = localStorage.getItem('userEmail');
      const petOwner = await this.userService.get_petowner(userEmail).toPromise()
        this.petOwner = petOwner;
        this.userFName = petOwner.name;
        this.userLName = petOwner.surname;
        this.userImageUrl = petOwner.profilePicUrl;
    } catch (error) {
        console.error(error);
      }
    }
  
    async getPetSitter(){
      try{
        const userEmail = localStorage.getItem('userEmail');
        const petSitter = await this.userService.get_petsitter(userEmail).toPromise()
          this.petSitter = petSitter;
          this.userFName = petSitter.name;
          this.userLName = petSitter.surname;
          this.userImageUrl = petSitter.profilePicUrl;
      }catch (error) {
        console.error(error);
      }
    }

  
}