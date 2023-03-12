import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { RdsUserServices } from '../../Interfaces/rds-user-services';
import { ServiceInterface } from '../../Interfaces/service-interface';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  

      handleError: any;

    
  constructor(private http: HttpClient) { }


  getServiceData(animal: string, location: string, service: string) {

    //make sure first letter is capital to match DB. 
    location = location.charAt(0).toUpperCase() + location.slice(1);

    let query = '';
    // condition for empty //
    if(animal == '' && service == '' && location == '')
    {
      query = 'https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/rds_users_services?sel=n'

    }
    // condition for just animal //
    else if(animal != '' && service == '' && location == '')
    {
      query = 'https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/rds_users_services?sel=a&animal=' + animal

    }

    //condition for just location //
    else if(location != '' && animal == '' && service == '')
    {
      query = 'https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/rds_users_services?sel=l&location=' + location

    }

    else if(animal != '' && service != '' && location == '' )
    {
      query = 'https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/rds_users_services?sel=k&animal=' + animal + '&service=' + service

    }

   // condition if all are selected// 
    else if(animal != '' && service != '' && location != '' )
    {
      query = 'https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/rds_users_services?sel=all&animal=' + animal + '&service=' + service + '&location=' + location

    }
//just service
    else if( service != '' && animal == ''  && location == '' )
    {
      query = 'https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/rds_users_services?sel=ser&service=' + service;

    }


    return this.http.get<RdsUserServices>(query)
    .pipe(
      tap(data => console.log('list/error' + JSON.stringify(data))
      
    ),
     catchError(this.handleError)
    );
}




getOtherServices(id : number)
{
  return this.http.get<any>('https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/other?id=' + id)
  .pipe(
    tap(data => console.log('Forum/error' + JSON.stringify(data))
  ),
  catchError(this.handleError)
 
  );
}

AddService(id: number,title: string, petType: string, service: string, des: string, price: string ): Observable<unknown>
{

  let key = petType + ' ' + service;

  let obj = 
  {
    "PetSitterID" :id,
    "Description": des,
    "ServiceTitle": key,
    "UserTitle" : title,
    "StartingPrice": price
  }

  console.log(obj);
  return this.http.post<any>('https://djftt69kei.execute-api.eu-west-1.amazonaws.com/n/prod',obj)
  .pipe(
   catchError(this.handleError)
  )

}

DeleteService(id)
{
  return this.http.get<any>("https://856hqzp4v5.execute-api.eu-west-1.amazonaws.com/deleteService?id=" + id)
  .pipe(
    tap(data => console.log('service' + JSON.stringify(data))
    
  ),
   catchError(this.handleError)
  );


}


}
