// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   apiURL: 'https://demrysiv68.execute-api.eu-west-1.amazonaws.com/dev/',
//   openRegistration: true
// };

export const environment = {
  GOOGLE_MAPS_API_KEY: 'AIzaSyCz-Nu0ku-0DJEe5iPt13RTq0QVpiz45AY',
  // production: true,
  SERVER_URL: 'http://localhost:3000', 
  region: 'eu-west-1',
  identityPoolId: 'eu-west-1:632c2f15-6b41-44b0-9d26-539386e90e4d',
  userPoolId: 'eu-west-1_dkqFlijuX',
  clientId: '1kvja59f1tthl9chrrjn59pgou',
  production: false,
  stream: { key: 'dfrmjwsp2372'},
  // GOOGLE_MAPS_API_KEY: 'AIzaSyCz-Nu0ku-0DJEe5iPt13RTq0QVpiz45AY',
  // region: 'eu-central-1',
  // identityPoolId: 'eu-west-1:632c2f15-6b41-44b0-9d26-539386e90e4d',
  // userPoolId: 'eu-west-1_dkqFlijuX',
  // clientId: '1kvja59f1tthl9chrrjn59pgou',
  domainName: 'ui-61hb39v3652llcugcb7489b7e1',
  redirectDomain: 'http://localhost:4200',
  sts_endpoint: '',
  UriPetSitter:'https://wwcwkeoqxa.execute-api.eu-west-1.amazonaws.com/dev', //petsitter, have to change it 
  UriPetOwner:'https://xpsdh54gsd.execute-api.eu-west-1.amazonaws.com/dev', //petowner 
  UriPet:'https://gl8g0i4oj1.execute-api.eu-west-1.amazonaws.com/',//Pet
  UriAddOrder:'https://g7oga89fg3.execute-api.eu-west-1.amazonaws.com/dev/', //Create Order 
  UriGetOrdersByPetSitter:'https://dw8reoypi6.execute-api.eu-west-1.amazonaws.com/dev', 
  UriGetOrdersByPetOwnerView:'https://kxewd44z5k.execute-api.eu-west-1.amazonaws.com/dev',

};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
