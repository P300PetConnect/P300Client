import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// Import these to load the 'Amplify' configuration file and connect 'Amplify' to the app
  
import 'zone.js';
  
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
  

// Import ends here


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
