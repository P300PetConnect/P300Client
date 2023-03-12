import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INotAvailable, IOrderList } from '../../interfaces/order';
import { DatePipe } from '@angular/common';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-not-available-form',
  templateUrl: './not-available-form.component.html',
  styleUrls: ['./not-available-form.component.scss'],
  providers: [DatePipe]
})
export class NotAvailableFormComponent implements OnInit {

 
  @Input() orders: IOrderList [] = [];
  @Input() userID: number;
  @Input() notAvailble: INotAvailable [] = [];
  @Output() newItemEvent = new EventEmitter();
  @Output() closeForm = new EventEmitter();

  repeatDates: string[] = [];
  message: any;
  selected: Date | null;

  alreadyCreated = false;
  
  constructor(private datePipe: DatePipe, private _order: OrderService) { }

  ngOnInit(): void {
  }

  SetNotAvailble(dateString: string, note: string)
  {
   
   
    let date = '';
    if(dateString == "null")
    {
      //sting of null passed from create single slot to convert date in correct formatt
      date = this.datePipe.transform(new Date(this.selected), 'dd MMM yyyy');

    }
    else
    {// create multiple date is in the correct format already
      date = dateString;
    }

    if(this.isDateInArray(date))
    {
      //if date is already in array show error screen
      this.alreadyCreated = true;
     
      
    }
    else
    {
      //if not add it
      let obj = 
      {
        "UserID": this.userID,
        "TimeStamp" : date,
        "Note": note
      }
      this._order.addNotAvailable(obj).subscribe({
        next: nAvailable => {
          console.log(JSON.stringify(nAvailable) + 'nAvailable added');
          this.message = "nAvailable added";
          this.newItemEvent.emit();
          //resets array
          this.repeatDates = [];
         
           },
        error: (err) => this.message = err
      });

    }

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

  SetRepeating(dateString: string, weeks: number, note: string)
  {
    
  
    let date = this.datePipe.transform(new Date(dateString), 'dd MMM yyyy');
       let futureDate = new Date(date);
       

      for(let i = 0; i < weeks; i ++)
      {
        this.repeatDates.push(this.datePipe.transform(new Date(futureDate.setDate(futureDate.getDate() + 1 * 7)), 'dd MMM yyyy') );
      }

      for(let i =0; i < this.repeatDates.length; i++)
      {
        this.SetNotAvailble(this.repeatDates[i], note);
      }
  }
  
  isDateInArray(value: string): boolean {
    //tests to see if date is in list array
   
     return this.notAvailble.some(obj => obj.TimeStamp === value);
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
