import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RdsUserServices } from 'src/app/search_service_interfaces/rds-user-services';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';

@Component({
  selector: 'app-search-sitter-services',
  templateUrl: './search-sitter-services.component.html',
  styleUrls: ['./search-sitter-services.component.scss']
})
export class SearchSitterServicesComponent implements OnInit {

  
  @Input()service?: any;
 
  showOther = false;
  otherServices?: any;
  errorMessage : any;
  averageRoundStars: number;

  constructor(private search: SearchServiceService, private _router: Router) { }

  ngOnInit(): void {
    
    this.service.ShowOther = false;
    this.averageRoundStars = Math.floor(this.service.ReviewsTotal / this.service.NumReviews);
   
  }


  num(n: number): Array<number> {
   alert(n);
    return Array(4);
  }
  SearchSitter(id: number){
    console.log('find')
    this._router.navigate(['/petsitterdetails', {'id': `${id}`}])
   //[routerLink]="['/petsitterdetails']"
  }

}
