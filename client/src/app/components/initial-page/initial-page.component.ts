import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
formFields: any;
@Input() event?: any; 

  constructor() { }

  ngOnInit(): void {
    console.log(this.event); 
  }

}
