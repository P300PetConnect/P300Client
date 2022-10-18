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
      description:"Hi we are looking for a dog walker to walk our lovely dog Frankie during the day and to keep her company for a few hours while we are at work. Require...",
      imageUrl:"https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg", 
      Location:"Sligo, Town", 
      CreatedDate:"14/10/2022"
    
    } ; //initialization

  
  constructor() { }

  ngOnInit(): void {
  }

}
