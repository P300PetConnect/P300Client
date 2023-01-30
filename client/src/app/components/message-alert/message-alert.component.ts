import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PetSitterServiceComponent } from '../pet-sitter-service/pet-sitter-service.component';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent implements OnInit {

  @Input() message:string; 

  constructor(public dialogRef: MatDialogRef<MessageAlertComponent>, private dialog:MatDialog){ }

  ngOnInit(): void {
  }

doNotCancel(){
  this.dialogRef.close();
}
onCancel(){
  this.dialog.closeAll(); }
}
