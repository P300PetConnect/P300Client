import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  -change so selected orders for the day can be more than 1
  -style the not available form
  -move calander to profile view will all events x't out
 
  
  */
  @Input() orders: IOrderList [] = [];
  @Input() userID: number;
  @Input() notAvailble: INotAvailable [] = [];
  @Output() newItemEvent = new EventEmitter();
  @Output() closeForm = new EventEmitter();
  message: any;
  
  constructor(private datePipe: DatePipe, private _order: OrderService) { }

  ngOnInit(): void {
  }

  SetNotAvailble(date: string)
  {
   
    date = this.datePipe.transform(new Date(date), 'dd MMM yyyy');
    alert(this.userID);

    let obj = 
    {
      "UserID": this.userID,
      "TimeStamp" : date

    }

    this._order.addNotAvailable(obj).subscribe({
      next: nAvailable => {
        console.log(JSON.stringify(nAvailable) + 'nAvailable added');
        this.message = "nAvailable added";
        this.newItemEvent.emit();
       
         },
      error: (err) => this.message = err
    });
  }
  DeleteNotAvailable(id: number)
  {
    
    this._order.DeleteItem(id).subscribe({
      next: nAvailable => {
        console.log(JSON.stringify(nAvailable) + 'nAvailable removed');
        this.message = "movie added";
        this.newItemEvent.emit();    
         },
      error: (err) => this.message = err
    });
  }

  refresh()
  {
    this.newItemEvent.emit();
  }
  CloseForm()
  {
    this.closeForm.emit();
  }

}
