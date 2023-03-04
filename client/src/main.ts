import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
//import 'dotenv/config';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';
// Import these to load the 'Amplify' configuration file and connect 'Amplify' to the app
  
import 'zone.js';
  
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
  

 registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpAaVxdX2NLfUN3R2lYdlRxcEUmHVdTRHRcQl5jTX9Rd0xiXXZbd3A=;Mgo+DSMBPh8sVXJ0S0J+XE9AflRGQmBWfFN0RnNYfVRxfV9HZEwxOX1dQl9gSX1TckRhWHZfdH1SRmQ=;ORg4AjUWIQA/Gnt2VVhkQlFacldJWXxKYVF2R2BJflx6dVxMYVhBJAtUQF1hSn5QdkFiW35XcXBcTmNY;MTI1NDY3MUAzMjMwMmUzNDJlMzBqQXpvWHlKVjl2bjFqWC9Ba2lFQlc1QVdFK2Y1OExOUE5sMTlXamIzbGlBPQ==;MTI1NDY3MkAzMjMwMmUzNDJlMzBEMDJnT25tcmg3TFBRS3pFQVJ2VUoyR1REdEZOYWM5ODN3YVNsMlEwTHNZPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmdWfUx0RWFab19yflRPal1VVBYiSV9jS31TdUVnWH1feXVQRmNaVQ==;MTI1NDY3NEAzMjMwMmUzNDJlMzBGdkVTSXhvZ3NIbVNuWExGdnpkdHdscndUblhGZXBaMTVmWElBYnVCVmFBPQ==;MTI1NDY3NUAzMjMwMmUzNDJlMzBQbVVwYVdYUnRoRC9MNmgzdnMvNUJjbDNjaTNVVlkvSWxVYW9xdlgvMUc0PQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJWXxKYVF2R2BJflx6dVxMYVhBJAtUQF1hSn5QdkFiW35XcXFVTmlY;MTI1NDY3N0AzMjMwMmUzNDJlMzBsTmxJSUVqTXVVQnpFdHErOHpDVkZLck15S2ZoWUI3NTE2YXN3MTRDY3BNPQ==;MTI1NDY3OEAzMjMwMmUzNDJlMzBDOEd5WVJkV2h0OU5rU0JCRmRNZHNIOE9oRVRGZE1qTTRSZTB1ZmVVOWlzPQ==;MTI1NDY3OUAzMjMwMmUzNDJlMzBGdkVTSXhvZ3NIbVNuWExGdnpkdHdscndUblhGZXBaMTVmWElBYnVCVmFBPQ==');



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
