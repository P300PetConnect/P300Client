import { Component, Input, OnInit } from '@angular/core';
import { SearchServiceService } from 'src/app/service/search_service_services/search-service.service';
import { ServiceInterface } from 'src/app/Interfaces/service-interface';

@Component({
  selector: 'app-pop-service-card',
  templateUrl: './pop-service-card.component.html',
  styleUrls: ['./pop-service-card.component.scss']
})
export class PopServiceCardComponent implements OnInit {

   @Input() service : ServiceInterface

  constructor() { }

  ngOnInit(): void {
  }

}
