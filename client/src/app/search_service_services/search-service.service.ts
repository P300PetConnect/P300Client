import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { RdsUserServices } from '../search_service_interfaces/rds-user-services';
import { ServiceInterface } from '../search_service_interfaces/service-interface';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  
  private serviceData : ServiceInterface[] = [
    {
  "title":"Dog Walking","image": "N/A",
  "desc": "Hire Someone to walk your dog"},
  {
    "title":"Pet Sitting","image": "N/A",
    "desc": "Hire someone to mind your pet"},
    {
      "title":"Pet Feeding","image": "N/A",
      "desc": "Need someone to feed your pet? See our pet sitter here"}]

      handleError: any;

      getServices(): Observable<ServiceInterface[]>{
        console.log('Dummy getBooks called');
    
        return of(this.serviceData);
      }
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
      tap(data => console.log('list/error', data)
      
    ),
     catchError(this.handleError)
    );
}




getOtherServices(id : number)
{
  return this.http.get<any>('https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/other?id=' + id)
  .pipe(
    tap(data => console.log('Forum/error',data)
  ),
  catchError(this.handleError)
 
  );
}

AddService(id: number,key1: string, key2: string, des: string ): Observable<unknown>
{
  let key = key1 + ' ' + key2
  let obj = 
  {
    "ID" :id,
    "Title": key,
    "Description": des
  }
  return this.http.post<any>('https://djftt69kei.execute-api.eu-west-1.amazonaws.com/n/prod',obj)
  .pipe(
   catchError(this.handleError)
  )

}


}
