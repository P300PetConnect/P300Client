import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator, FormGroup } from '@angular/forms';
import { catchError, Observable, tap } from 'rxjs';
import { IOrder } from '../interfaces/form';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _http: HttpClient) { }

  handleError: any;
  addOrder(order : FormGroup)
  {
    console.log('order here',order.value);
    return this._http.post<any>('https://g7oga89fg3.execute-api.eu-west-1.amazonaws.com/dev/', order.value)
    .pipe(tap(), catchError(this.handleError));
  }

  getOderByUser(PetSitterID){
    return this._http.get<IOrder[]>('https://dw8reoypi6.execute-api.eu-west-1.amazonaws.com/dev/orders?PetSitterID='+PetSitterID)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
      
    ),
     catchError(this.handleError)
    );
  }
}