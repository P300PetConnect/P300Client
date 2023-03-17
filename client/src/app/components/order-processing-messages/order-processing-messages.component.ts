import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-order-processing-messages',
  templateUrl: './order-processing-messages.component.html',
  styleUrls: ['./order-processing-messages.component.scss']
})
export class OrderProcessingMessagesComponent implements OnInit {


  @Input() message:string; 
  @Output() close: EventEmitter <boolean> = new EventEmitter < boolean > ();
  @Output() startorderdata = new EventEmitter<any>();

  
  constructor(public dialogRef: MatDialogRef<OrderProcessingMessagesComponent>, private dialog:MatDialog, 
    public dialogRef2: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('message', this.data);
  }
   
  ngOnInit(): void {
  }

doNotCancel(){
  this.startorderdata.emit(true);
  this.dialogRef.close();
}
onCancel(){
  this.dialog.closeAll();

  if ((this.data.message.taskName = 'yesCancel')) {
    this.dialogRef.close({ option: 'yesCancel' });
  }

}
}
