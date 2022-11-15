import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-other-services',
  templateUrl: './other-services.component.html',
  styleUrls: ['./other-services.component.scss']
})
export class OtherServicesComponent implements OnInit {

  @Input()service?: any
  @Input()alreadyDisplayed? : any
  constructor() { }

  ngOnInit(): void {
  }

}
