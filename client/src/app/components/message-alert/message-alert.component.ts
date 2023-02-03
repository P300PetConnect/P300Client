import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { PetSitterServiceComponent } from '../pet-sitter-service/pet-sitter-service.component';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent implements OnInit {

  @Input() message:string; 
  @Output() close: EventEmitter < boolean > = new EventEmitter < boolean > ();

  
  constructor(public dialogRef: MatDialogRef<MessageAlertComponent>, private dialog:MatDialog, 
    public dialogRef2: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('message', this.data);
  }
   
  ngOnInit(): void {
  }

doNotCancel(){
  this.dialogRef.close();
}
onCancel(){
  this.dialog.closeAll();

  if ((this.data.message.taskName = 'yesCancel')) {
    this.dialogRef.close({ option: 'yesCancel' });
  }

}
}
