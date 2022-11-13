import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { RdsUserServices } from '../search_service_interfaces/rds-user-services';
import { ServiceInterface } from '../search_service_interfaces/service-interface';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  
  private dummyBooksData : ServiceInterface[] = [
    {
  "title":"Dog Walking","image": "N/A",
  "desc": "Hire Someone to walk your dog"},
  {
    "title":"Pet Sitting","image": "N/A",
    "desc": "Hire someone to mind your pet"},
    {
      "title":"Pet Feeding","image": "N/A",
      "desc": "Need someone to feed your pet? See our pet sitter here"}]


      getServices(): Observable<ServiceInterface[]>{
        console.log('Dummy getBooks called');
    
        return of(this.dummyBooksData);
      }
  constructor(private http: HttpClient) { }


  getServiceData() : Observable<RdsUserServices> {
    return this.http.get<RdsUserServices>('https://0r68frdpq4.execute-api.eu-west-1.amazonaws.com/rds_users_services?county=Dublin&sel=n')
    .pipe(
      tap(data => console.log('Forum/error' + JSON.stringify(data))
    )
   
    );
}
}
