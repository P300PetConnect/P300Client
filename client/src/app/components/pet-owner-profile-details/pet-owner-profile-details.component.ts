import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-owner-profile-details',
  templateUrl: './pet-owner-profile-details.component.html',
  styleUrls: ['./pet-owner-profile-details.component.scss']
})
export class PetOwnerProfileDetailsComponent implements OnInit {

  viewonly:boolean = true; 

  constructor() { }

  ngOnInit(): void {

  }

}
