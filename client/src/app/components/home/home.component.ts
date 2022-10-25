import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
formFields: any;
@Input() event?: any; 

  constructor() { }

  ngOnInit(): void {
    console.log(this.event); 
  }

}
