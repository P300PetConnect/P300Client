import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  constructor() { }
  
  isSelected:boolean = false; 
  isShow:boolean; 


  ngOnInit(): void {
  }

}
