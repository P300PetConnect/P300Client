import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  constructor() { }
form: FormGroup; 
private formSubmitAttemp:boolean; 

  ngOnInit(): void { }

}
