import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLogout:boolean =false;  
  constructor(public authenticator: AuthenticatorService) {
    // Amplify.configure(awsExports);
  }
  ngOnInit(): void {
    console.log(this.authenticator); 

  }
  @Output()
  public myLogout = new EventEmitter<MouseEvent>();

 Logout() {
    this.isLogout = true; 
    console.log(this.isLogout); 
  }
  
}
