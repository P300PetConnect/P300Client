import { Component, Input, OnInit } from '@angular/core';
import { IPet } from '../../interfaces/form';

@Component({
  selector: 'app-pet-card-view',
  templateUrl: './pet-card-view.component.html',
  styleUrls: ['./pet-card-view.component.scss']
})
export class PetCardViewComponent implements OnInit {

  @Input() pet:IPet; 

  constructor() { }

  ngOnInit(): void {
    console.log(this.pet); 
  }

  selectPet(){

  }
}
