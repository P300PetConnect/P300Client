import { Component, OnInit } from '@angular/core';
import { ServiceInterface } from 'src/app/search_service_interfaces/service-interface';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';
import { RdsUserServices } from 'src/app/search_service_interfaces/rds-user-services';
import { HttpClient } from '@angular/common/http';
import { Console } from 'console';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  services: ServiceInterface[] = [];

  isSearching = false;
  errorMessage : any;

  userServices?: any;

  constructor(private search: SearchServiceService) { }

  ngOnInit(): void {
    this.search.getServices().subscribe({
      next: (value: ServiceInterface[]) => this.services = value,
      complete: () => console.log('book service finished'),
     // error: (message) => this.message = message
    }) 

    console.log(this.services);
  }

  GetUserServices(): boolean{
    this.isSearching = ! this.isSearching;
    
    this.search.getServiceData().subscribe(
      (      results: RdsUserServices) => {
        this.userServices= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
      },
      (      error: any) => this.errorMessage = <any>error
    );

    console.log(this.userServices);

    return false;
  }


}
