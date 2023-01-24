import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
//import awsExports from 'src/aws-exports';

@Injectable()
export class CognitoGuard implements CanActivate {

  constructor(private cognitoService: AuthenticatorService,  private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.cognitoService) {
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    } else {
        console.log('to do ');
        return false; 
    //   window.location.href = CognitoService['login'];
    }

  }
}