import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { IOrder } from '../interfaces/form';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _http: HttpClient) { }
  handleError: any;
  addOrder(order : FormGroup)
  {
    console.log('order here',order.value);
    return this._http.post<any>(environment.UriAddOrder, order.value)
    .pipe(tap(), catchError(this.handleError));
  }

  getOderByUser(PetSitterID){
    return this._http.get<IOrder[]>(environment.UriGetOrdersByPetSitter+'/orders?PetSitterID='+PetSitterID)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
    ),
     catchError(this.handleError)
    );
  }

  getOrderByUserPetOwnerView(PetOwnerID){
    return this._http.get<IOrder[]>(environment.UriGetOrdersByPetOwnerView+'/orders?PetOwnerID='+PetOwnerID)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
      
    ),
     catchError(this.handleError)
    );
  }
}