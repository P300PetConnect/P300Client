import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from 'rxjs'
import { IUser } from "../interfaces/form";
import { environment } from "src/environments/environment";
import { IPetOwner, IPetSitter } from "../interfaces/users";
import { userInfo } from "os";

@Injectable()

export class UserService{

    private baseUrl = `${environment.UriPetSitter}/user/`;
    private baseUrlPetOwner = `${environment.UriPetOwner}/user/`;

    constructor(private _http: HttpClient){ } 

    get_petsitter_ID(id){
        return this._http.get<IPetSitter>("https://856hqzp4v5.execute-api.eu-west-1.amazonaws.com/user?id="+ id
        )
        .pipe(
            catchError(this.hangleError)
        )
    
        )
    
        }

        get_petsitter(email): Observable<IPetSitter>{
            return this._http
            .get<IPetSitter>(
                this.baseUrl+email
            )
            .pipe(tap((petSitter: IPetSitter) => {
                localStorage.setItem('PetConnectUser', JSON.stringify(petSitter))
            }), catchError(this.hangleError))
        }

    private hangleError(err: HttpErrorResponse){
        return throwError('error: ' + err.message)
    }

    get_petowner(email): Observable<IPetOwner>{
        return this._http
        .get<IPetOwner>(
            this.baseUrlPetOwner+email
        )
        .pipe(
            tap((petOwner: IPetOwner) => {
                localStorage.setItem('PetConnectUser', JSON.stringify(petOwner))
            }),
            catchError(this.hangleError2))
    }
    private hangleError2(err: HttpErrorResponse){
        return throwError('error: ' + err.message)
    }

    
    get_petownerByUserID(userId:number):Observable<IUser>{
        console.log("get pet sitter called")
        return this._http.get<IUser>('https://0hwn2bfu5h.execute-api.eu-west-1.amazonaws.com/dev/PetOwnerByID-dev-index?UserID='+userId)
    }


    update_petowner(petwoner:IPetOwner):Observable<IPetOwner>{
        return this._http.put<IPetOwner>(this.baseUrlPetOwner, petwoner)
        .pipe(tap(), catchError(this.hangleError2))
        }

        update(email: string, params: any) {
            console.log(params);
            return this._http.put( this.baseUrlPetOwner+email, params);
        }
    
  }
