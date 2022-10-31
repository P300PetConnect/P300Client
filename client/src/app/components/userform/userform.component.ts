import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IUser } from '../interfaces/users';
import { UserService } from '../service/data.service';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  constructor(private _serviceGetUser: UserService) { }

userData?: IUser; 
form: UntypedFormGroup; 
private formSubmitAttemp:boolean; 

  ngOnInit(): void { 
    this.getUser(); 
    console.log(this?.userData?.name)
  }


  getUser(){
    this._serviceGetUser.get_user("Frank@hotmail.com").subscribe(
      userData=>{
        this.userData = userData;
        console.log(userData)
      }); 
      return false; 
    }
  }

