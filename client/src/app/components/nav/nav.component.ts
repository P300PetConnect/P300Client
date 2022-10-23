import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  petsitter = 
  { id:"1",
    name:'Anne Smith', 
    title:"Dog care", 
    location:"Sligo Town",
    description:"Personalised and flexible pet care,I provide one-on-one love and attention in a cosy home space.",
    imageUrl:"https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg", 
    Location:"Sligo, Town", 
    CreatedDate:"14/10/2022", 
    skills:["Pet Walker", "Pet Minder", "Overnight", "Weekly", "Monthly"], 
    pettype:["Dog", "Cat", "Fish"]
  
  } ; 
  
  constructor() { }


  ngOnInit(): void {
  }

}
