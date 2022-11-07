import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  isLoggedIn = false;
  constructor() { }
isAuthenticated(){
    return this.isLoggedIn;
  }
}
