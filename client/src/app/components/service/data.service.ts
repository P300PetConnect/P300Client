import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUser } from "../interfaces/users";

@Injectable()

export class UserService{
    // baseUrl: string = 'https://ooqrrcdvxl.execute-api.eu-west-1.amazonaws.com/dev/user/joanna@gmail.com'; 
    baseUrl: string = 'https://demrysiv68.execute-api.eu-west-1.amazonaws.com/dev/user/';

    constructor(private _http: HttpClient){ } 

    get_user(email): Observable<IUser>{
        return this._http
        .get<IUser>(
            this.baseUrl+email
        )
        .pipe(tap(), catchError(this.hangleError))
    }
    private hangleError(err: HttpErrorResponse){
        return throwError('error: ' + err.message)
    }

}