import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import awsExports from 'src/aws-exports';


@Injectable()
export class CognitoGuard implements CanActivate {

  constructor(private cognitoService: AuthenticatorService) {}

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.cognitoService) {
      return true;
    } else {
        console.log('to do ');
    //   window.location.href = CognitoService['login'];
    }

  }
}