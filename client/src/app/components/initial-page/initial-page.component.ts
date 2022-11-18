import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../interfaces/form';
import { UserService } from '../service/user.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
formFields: any;
@Input() userEmail?: any; 
user?: any; 

  constructor(private _userService: UserService) { }

  displayAlert: boolean = false; 

  ngOnInit(): void {
    // this.userData()
  
  }

  getStarted(){
    if(this.displayAlert){
      this.displayAlert = false;
    }
    else{
      this.displayAlert = true; 
    }
  }
  // userData():boolean{
  //     this?._userService.get_user(this?.userEmail).subscribe(
  //       user=>{
  //         this.user=user; 
  //         console.log('we did it bitch',this?.user); 
  //       },
  //     // error => this.errorMessage = <any>error
  //     );
  //   return false; 
  //   }


  
}
