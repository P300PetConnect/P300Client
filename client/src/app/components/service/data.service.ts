import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, Observable, tap, throwError } from 'rxjs'
import { IUser } from "../interfaces/users";


@Injectable()

export class UserService{

    baseUrl: string = environment.apiURL; 
    
    email: string = "Frank@hotmail.com"; 
    constructor(private _http: HttpClient){ } 

    get_user(): Observable<IUser>{
        return this._http
        .get<IUser>(
            this.baseUrl + this.email
        )
        .pipe(tap(), catchError(this.hangleError))
    }
    private hangleError(err: HttpErrorResponse){
        return throwError('error: ' + err.message)
    }

}