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
  subtitle: string; 
  DisplayMessage: boolean=false;

  constructor(public dialogRef: MatDialogRef<OrderProcessingMessagesComponent>, private dialog:MatDialog, 
    public dialogRef2: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('message', this.data);
  this.subtitle = this.data?.message?.subtitle; 
  }
   
  ngOnInit(): void {
    // taskName:'yesCancel',
    // title:'Before Finish the Order', 
    // subtitle:'Finish it!', 
    // btntext1:'Yes, cancel', 
    // btntext2:'No, dont cancel', 
    // subtitle1:'The Pet with the pet owner', 
    // subtitle2:'He is happy!', 
    // subtitle3:'I agree with all policy!'
  
  }

doNotCancel(){
  this.DisplayMessage=true; 

  this.startorderdata.emit(true);
  // this.dialogRef.close();
}
onCancel(){
  this.dialog.closeAll();

  if ((this.data.message.taskName = 'yesCancel')) {
    this.dialogRef.close({ option: 'yesCancel' });
  }
}
onClose(){
  this.dialogRef.close(); 
}
}
