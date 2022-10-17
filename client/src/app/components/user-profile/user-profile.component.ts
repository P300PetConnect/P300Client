import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  skills = ["Pet Walker", "Pet Minder", "Overnight", "Weekly", "Monthly"]   //initialization
  petsitter = 
    { id:"1",
      name:'Anne Smith', 
      title:"Dog care", 
      location:"Sligo Town",
      description:"Hi we are looking for a dog walker to walk our lovely dog Frankie during the day and to keep her company for a few hours while we are at work. Require..."
    } ; //initialization

  
  constructor() { }

  ngOnInit(): void {
  }

}
