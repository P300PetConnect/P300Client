import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { IOrder } from '../interfaces/form';
import { environment } from "src/environments/environment";
import { INotAvailable, IOrderList } from '../interfaces/order';


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

  getOrdersList(id)
  {
    return this._http.get<IOrderList>("https://856hqzp4v5.execute-api.eu-west-1.amazonaws.com/order?id=" + id)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
      
    ),
     catchError(this.handleError)
    );

  }

  getNotAvailable(id)
  {
    return this._http.get<INotAvailable>("https://856hqzp4v5.execute-api.eu-west-1.amazonaws.com/not?id=" + id)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
      
    ),
     catchError(this.handleError)
    );

  }

  addNotAvailable(obj)
  {
    return this._http.post("https://l4m2qu5vya.execute-api.eu-west-1.amazonaws.com/prod/not", obj)
    .pipe(
      tap(data => console.log('nAvailable/error' + JSON.stringify(data))
      
    ),
     catchError(this.handleError)
    );

  }
}

