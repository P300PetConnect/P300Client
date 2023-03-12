import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of, tap, throwError } from 'rxjs'
import { IPet } from '../../interfaces/form';
import { map } from 'rxjs/operators';
import { ok } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private _http: HttpClient) { }
  private baseUriPet = `${environment.UriPet}/pet/`;

  get_petdetails(email): Observable<IPet[]> {
    return this._http.get<IPet[]>(`${this.baseUriPet+email}`)
  }

  add_Pet(email: string): Observable<IPet> {
    return this._http.post<IPet>(`${this.baseUriPet}/${email}`, {}).pipe(
      catchError(error => {
        console.error(`Error adding pet with email ${email}: ${error}`);
        return of(null);
      }),
      map((pet: IPet) => {
        if (!pet) {
          throw new Error(`No pet found for email ${email}`);
        }
        return pet;
      })
    );
  }
  

}
