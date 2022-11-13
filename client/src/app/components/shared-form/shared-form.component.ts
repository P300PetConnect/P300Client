import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/data.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss']
})
export class SharedFormComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<SharedFormComponent>, private _userService:UserService ) { }

  ngOnInit(): void {
  }

  onSubmit(){
//TODO

this.onClose(); 
  }
  onClose(){
    // this._userService.initializeFormGroup(); 
    this.dialogRef.close(); 
  }

}
