import { Component, Input, OnInit } from '@angular/core';
import { INotAvailable, IOrderList } from '../interfaces/order';
import { DatePipe } from '@angular/common';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-not-available-form',
  templateUrl: './not-available-form.component.html',
  styleUrls: ['./not-available-form.component.scss'],
  providers: [DatePipe]
})
export class NotAvailableFormComponent implements OnInit {

  /*
  
  */
  @Input() orders: IOrderList [] = [];
  @Input() notAvailble: INotAvailable [] = [];
  message: any;
  
  constructor(private datePipe: DatePipe, private _order: OrderService) { }

  ngOnInit(): void {
  }

  SetNotAvailble(date: string)
  {
   
    date = this.datePipe.transform(new Date(date), 'dd MMM yyyy');

    let obj = 
    {
      "UserID": 43,
      "TimeStamp" : date

    }

    this._order.addNotAvailable(obj).subscribe({
      next: nAvailable => {
        console.log(JSON.stringify(nAvailable) + 'nAvailable added');
        this.message = "list added";
        
       
         },
      error: (err) => this.message = err
    });
  }

}
