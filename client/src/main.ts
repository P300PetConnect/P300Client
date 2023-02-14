import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// Import these to load the 'Amplify' configuration file and connect 'Amplify' to the app
  
import 'zone.js';
import { registerLicense } from '@syncfusion/ej2-base';

  
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

registerLicense('Mgo+DSMBaFt/QHRqVVhkVVpHaV5HQmFJfFBmQmlYeFR1cEUmHVdTRHRcQl9iSn9adEVjXHhZeHE=;Mgo+DSMBPh8sVXJ0S0J+XE9Af1RBQmJMYVF2R2BJeFRxc19DZEwxOX1dQl9gSXxSdURqW39edXNcRWU=;ORg4AjUWIQA/Gnt2VVhkQlFaclZJXnxIe0x0RWFab1l6dVJMZVhBJAtUQF1hSn5Rd0ZiUH1ecHFdRWRZ;MTEyMjk4MEAzMjMwMmUzNDJlMzBtR2ZFZHVmc2kxd3hUTjlYV3VFc2hYbUpDTWVkZnpLZE9YanZ2YVhxeE13PQ==;MTEyMjk4MUAzMjMwMmUzNDJlMzBicVdOMmJqaVB4UjloUnZnMEZNVXN2dCt1VGdFTnllWU55QVMxWkEwTFpVPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtLVmBWf1ZpR2NbfE53flRBallVVBYiSV9jS31TdERgWHZccHRQT2RdVA==;MTEyMjk4M0AzMjMwMmUzNDJlMzBkZExWcUdQdXB6WHVZbjZNL2ttNTRNbkdzU2tsSS9XdlQzQnQ4M05iUCs0PQ==;MTEyMjk4NEAzMjMwMmUzNDJlMzBpVWFhcGFkckJpSVNoaXRGQmFRemZYZ0c3eDgvdi9US3pyUzFMUzlueE5vPQ==;Mgo+DSMBMAY9C3t2VVhkQlFaclZJXnxIe0x0RWFab1l6dVJMZVhBJAtUQF1hSn5Rd0ZiUH1ecHJVRmla;MTEyMjk4NkAzMjMwMmUzNDJlMzBGMFlkK2ZsQ01GSkNyQmw0Wk5FUjU5WlE0dCtWaVQrUGFybnJRSE5Ya0FrPQ==;MTEyMjk4N0AzMjMwMmUzNDJlMzBKUXBVYjJoNHVRN3J6clQxSkJEa0FDV0ZjMk5GYTlobkkycEc0VmMyeEpFPQ==;MTEyMjk4OEAzMjMwMmUzNDJlMzBkZExWcUdQdXB6WHVZbjZNL2ttNTRNbkdzU2tsSS9XdlQzQnQ4M05iUCs0PQ==');

// Import ends here

enableProdMode();


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
