import { Component, OnInit } from '@angular/core';
import { ServiceInterface } from 'src/app/search_service_interfaces/service-interface';
import { SearchServiceService } from 'src/app/search_service_services/search-service.service';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {

  services: ServiceInterface[] = [];

  constructor(private search: SearchServiceService) { }

  ngOnInit(): void {
    this.search.getServices().subscribe({
      next: (value: ServiceInterface[]) => this.services = value,
      complete: () => console.log('book service finished'),
     // error: (message) => this.message = message

    }) 

  }

}
