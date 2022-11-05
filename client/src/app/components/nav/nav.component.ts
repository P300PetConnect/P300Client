import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService) {
    // Amplify.configure(awsExports);
  }
  ngOnInit(): void {
    console.log(this.authenticator); 


  }

}
