import { Component, OnInit, Input } from '@angular/core';
import { RdsUserServices } from 'src/app/search_service_interfaces/rds-user-services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  

  @Input()userServices?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
