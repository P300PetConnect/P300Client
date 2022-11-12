import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  constructor() { }
}
