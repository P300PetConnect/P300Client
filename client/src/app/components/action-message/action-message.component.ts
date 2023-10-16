import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-action-message',
  templateUrl: './action-message.component.html',
  styleUrls: ['./action-message.component.scss']
})
export class ActionMessageComponent implements OnInit {

  @Input() title:string; 
  constructor(public dialogRef:MatDialogRef<ActionMessageComponent>) { }

  ngOnInit(): void {
  }
  onClose(){
    this.dialogRef.close(); 
  }
  

}
