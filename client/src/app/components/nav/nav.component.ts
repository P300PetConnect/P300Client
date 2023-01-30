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

  constructor( public authenticator: AuthenticatorService, private readonly  _router: Router) {
    // Amplify.configure(awsExports);
  }
  ngOnInit(): void {

    console.log(this.authenticator.user); 
    this.userInfor =this.authenticator.user;  
  }


  @Output()
  public myLogout = new EventEmitter<MouseEvent>();

  async Logout() {
    this.isLogout = true; 
    this.authenticator?.signOut()

    this._router.navigate(['/login'])
    this._router.routeReuseStrategy. shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
}


  
}
