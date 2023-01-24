import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs'
import { IPet } from '../interfaces/form';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private _http: HttpClient) { }
  private baseUriPet = `${environment.UriPet}/pet/`;

  get_petdetails(email): Observable<IPet[]> {
    return this._http.get<IPet[]>(`${this.baseUriPet+email}`)
  }
}
