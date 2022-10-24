import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsExports from 'src/aws-exports';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}

