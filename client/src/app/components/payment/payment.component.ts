import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IOrder } from '../../interfaces/form';
import { EOrderStatus, EPaymentStatus } from '../../interfaces/order';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MessageAlertComponent } from '../../shared-components/message-alert/message-alert.component';
import { MatStepper } from '@angular/material/stepper';
import { OrderService } from '../../service/order.service';
import { EmailService } from '../../service/email.service';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'], 

})
export class PaymentComponent implements OnInit {  
  btnclass: string;
  btnText: string;
  actionToBtn?: string;
  btnText2: string; 
  cardTitle:string; 
  userGroup: string;  
  paymentMessage: string; 
  confirmedMessage: string; 

  message: { taskName: string; title: string; subtitle: string; btntext1: string; btntext2: string; };
  private dialogRef2?: MatDialogRef<MessageAlertComponent>
  btnclass2: string;
  orderStatus: string='';

  constructor(private _http: HttpClient, private dialog:MatDialog, private emailService: EmailService, private _httpOrder:OrderService) { }
  paymentHandler: any = null;
  @Input() order:IOrder | undefined;
  @ViewChild('btn2') btn2: ElementRef;
  @Input() orderStatusUpdated: string; 

  @ViewChild('stepper')
  stepper: MatStepper;

  ngOnInit() {
    this.invokeStripe();
    this.checkCurrentStatus(); 
    this.userGroup =  JSON.parse(localStorage.getItem('userGroup')); 

  }

  checkCurrentStatus(){
    console.log('check status', this.order); 

    if(this.order.Status==EOrderStatus.Processing){
      // this.confirmedStatus(); 
    }
    else if(this.order.Status==EOrderStatus.Canceled){
      // this.CanceledStatus(); 
    }
    else if(this.order.Status==EOrderStatus.Pendent){
      this.userGroup =  JSON.parse(localStorage.getItem('userGroup')); 

      if(this.userGroup == 'PetOwner'){
        this.changeOrderStatus("success","info","Edit Order", "Make Payment","Confirm","Make payment to confirm your order"); 
      }
      else{
        this.paymentMessage = "Awaiting payment from Pet Owner."; 
      }

    }
    else if(this.order.Status==EOrderStatus.Completed){
      // this.Completed(); 
    }
    else if(this.order.Status==EOrderStatus.Review){
      // this.confirmedStatus(); 
    }
  }

  SecondBtnPayment(amount: any, doAction:string) {
    if(this.order.Status == EOrderStatus.Completed){
      this.onCreateReview(); 
    }
  }
  onCreateReview(){

  }
  makePayment(amount: any, doAction:string) {
    if(doAction=='Confirm'){
        const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MWB7YAoSiviOVuvgwBp0jfYUIN2ype1syfcNPSMq6jIxJeCAnMCfwB1ddbez4r5zo4sSOStblgpJ2gWJmbjG6bO00oC3DWa5K',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.confirmpayment(stripeToken);
      },
    });
    paymentHandler.open({
      name: 'PetConnect',
      description: amount,
      amount: amount * 100,
    });
    }
  }
  confirmpayment(stripeToken: any) {
    // Add your code here to confirm the payment
    console.log(' // Add your code here to confirm the payment', stripeToken); 
    // this.changeOrderStatus("success","info","Edit Order", "Done","Confirm","Payment Done"); 
    //Update Payment Status
    this.updatePaymentStatus(); 
    // Thenk you, Payment confirmed - Display the message - Payment confirmed 
    this.confirmedMessage = 'Thenk you, Payment confirmed'; 
    }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MWB7YAoSiviOVuvgwBp0jfYUIN2ype1syfcNPSMq6jIxJeCAnMCfwB1ddbez4r5zo4sSOStblgpJ2gWJmbjG6bO00oC3DWa5K',
          locale: 'auto',
          token: function (stripeToken: any) {
            alert('Payment has been successfull!');
            console.log(stripeToken); //payment done

          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  updatePaymentStatus(){
    this.order.PaymentStatus = EPaymentStatus.Confirmed; 
    this.order.Status = EOrderStatus.Processing; 
    console.log('the order',this.order); 
    this._http.put('https://72r8qqly5b.execute-api.eu-west-1.amazonaws.com/dev',this.order).subscribe(data => {
      console.log('my data',data);
    });
  }

  onCancel(){
    
    this.message={
      taskName:'yesCancel',
      title:'Are you sure to Cancel this Order? ', 
      subtitle:'If you cancel this event,it will be permanently cancelled.', 
      btntext1:'Yes, cancel', 
      btntext2:'No, dont cancel'}

    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = false; 
    dialogConfig.width = "40%";
    dialogConfig.height = "31%";
    this.dialogRef2 = this.dialog.open(MessageAlertComponent, {data:{ order: this.order, message: this.message}
    }); 
    this.dialogRef2.afterClosed().subscribe(result=>{
      if(result.option=='yesCancel'){
        if (this.order) {
          this.order.Status = EOrderStatus.Canceled; 
          this.order.PaymentStatus = EPaymentStatus.Refounded; 
          console.log('my roder', this.order)
          this._http.put('https://72r8qqly5b.execute-api.eu-west-1.amazonaws.com/dev',this.order).subscribe(data => {
            console.log('my data',data);
          });
        } 
      }
      else{
        this.dialogRef2?.close(); 
      }
    })
  }

changeOrderStatus( btnclass:string, btnclass2:string, btnText2:string, btnText:string, actionToBtn:string,cardTitle:string){
  this.cardTitle=cardTitle; 
    this.btnclass=btnclass; 
    this.btnclass2=btnclass2; 
    this.btnText = btnText; 
    this.btnText2 = btnText2; 
    this.actionToBtn = actionToBtn; 
}


  // CanceledStatus(){
  //   this.btnclass="btn-secondary disabled";
  //   this.btnText='Order Canceled';
  //   this.actionToBtn = '';
  //   this.cardTitle="This order was canceled, this card will be removed in 7 days"
  // }
  // confirmedStatus(){
  //   this.cardTitle="Cancellation is allowed with full refound up to 24 house before your due, please check our Refound Policy"; 
  //    this.btnclass="danger";
  //       this.btnText = 'Cancel';
  //       this.actionToBtn = "Cancel"; 
  // }
  // PendentStatus(){
  //   this.cardTitle="Make payment to confirm your order"; 
  //   this.btnclass="success";
  //   this.btnclass2="info"
  //   this.btnText = 'Make Payment';
  //   this.actionToBtn = "Confirm"; 
  // }
  // Completed(){
  //   this.cardTitle="Thanks! Please tell me more about your experience, giving a review"; 
  //   this.btnclass="success";
  //   this.btnclass2="info";
  //   this.btnText = 'Order again';
  //   this.btnText2= 'Give Review'
  //   this.actionToBtn = "GiveReview"; 
  // }
  PaymentManagement(){
    if(this.order?.PaymentStatus=='Confirmad'){
     
    }
  }
  
}





