import { Component, OnInit, Input } from '@angular/core';
import { RdsUserServices } from 'src/app/Interfaces/search_service_interfaces/rds-user-services';
import { SearchServiceService } from 'src/app/service/search_service_services/search-service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  

  @Input()service?: any;
 
  showOther = false;
  otherServices?: any;
  errorMessage : any;

  constructor(private search: SearchServiceService) { }

  ngOnInit(): void {
    
    this.service.ShowOther = false;
  }

  // public getOtherServices(id : string)
  // {
  //   this.service.ShowOther = ! this.service.ShowOther;

  //   if( this.service.ShowOther == true)
  //   {
  //     this.search.getOtherServices(id).subscribe(
  //       (      results: RdsUserServices) => {
  //         this.otherServices= ( Array.of(JSON.parse(JSON.stringify(results)))) ;
  //       },
  //       (      error: any) => this.errorMessage = <any>error
  //     );
  
  //     console.log(this.otherServices);
  
  //     return false;

  //   }

  //   return false;
   

  // }
}
