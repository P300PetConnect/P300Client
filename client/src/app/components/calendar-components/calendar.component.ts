import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { INotAvailable, IOrderList } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/components/service/order.service';
import { CalendarDay, event} from '../calender-class/cal-class'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
 
  // constructor(private datePipe: DatePipe) {

  // }
  constructor(private datePipe: DatePipe, private router: Router, private _order: OrderService) { 
    this.startDate = new Date();
  }

//pass string as input from component, different for each component, use ngif and have two versions of the calender. 
  public displayMonth: string;
  private monthIndex: number = 0;
  selectedOrders: IOrderList [] = [];
  displayEvent = false;
  displayNotAvailable = false;
  message: any;
  
  @Input() orders: IOrderList [] = [];
  @Input() notAvailble: INotAvailable [] = [];
  @Input() componentFlag: string;
  @Output() deleteNA = new EventEmitter();

  showday = false;
  showweek = false;
  showmonth = true;
  public startDate: Date;
  public startDateStr: string;
  public monthStr: string;
  dates: Date[] = [];
  
  ordersDay: IOrderList [] = [];
   notAvailbleDay: INotAvailable [] = [];


  
  

  public calendar: CalendarDay[] = [];
  picKeyWords: string[] = ["Feed", "Walk", "Sitting","Grooming"] ;
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

 

  ngOnInit(): void {
    
    this.generateCalendarDays(this.monthIndex);
    this.startDateStr = this.datePipe.transform(new Date(this.startDate), 'dd MMM');
    this.CheckForDayEvents();
   
    
  }

  isObjectInArray(value: string): boolean {

    return this.orders.some(obj => 
      new Date(obj.OrderStartDate).toDateString() ===  new Date(value).toDateString()
      );
  }

  isObjectInArray2(value: string): boolean {

     return this.notAvailble.some(obj => obj.TimeStamp === value);
   }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    date.setHours(0,0,0,0);
    return date;
}

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    /// pass start index, so you can render calender for the next week 
    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 31; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }


  private getStartDateForCalendar(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

   public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  setValues(value: string)
  {
    //gets date from clicked on event, matches it to the order list
    value = new Date(value).toDateString();
    for(var i = 0; i < this.orders.length; i++)
    {
      let d =  new Date(this.orders[i].OrderStartDate).toDateString();

      if(d == value)
      {
        //sets selected order in temp object so we can render the details out on screen
        this.selectedOrders.push(this.orders[i]);
      }
    }
    if(this.selectedOrders.length > 1)
    {
      this.selectedOrders.sort((a, b) => new Date(a.OrderStartDate).getTime() - new Date(b.OrderStartDate).getTime());

    }
 
    this.displayEvent = true;
   
  }
  ChangeRoute()
  {
    this.router.navigate(['/orders']);

  }


//methods for week view

  getDatesForWeek() {
    this.dates = [];
    const endDate = new Date(this.startDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    let currentDate = this.startDate;
    while (currentDate < endDate) {
      this.dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
   

  }
  getNextWeek(): void {
   this.dates = [];
   this.monthStr = this.datePipe.transform(new Date(this.startDate), 'MMMM');
   this.getDatesForWeek();
  }

  getLastWeek(): void {
    this.dates = [];
     this.startDate.setDate(this.startDate.getDate() - 14); 
     this.monthStr = this.datePipe.transform(new Date(this.startDate), 'MMMM');
     this.getDatesForWeek();
   }
   
   addDay()
   {
  
    this.startDate.setDate(this.startDate.getDate() + 1); 
    this.startDateStr = this.datePipe.transform(new Date(this.startDate), 'dd MMM');
    this.CheckForDayEvents();
 

   }
   subtractDay()
   {
    this.startDate.setDate(this.startDate.getDate() - 1); 
    this.startDateStr = this.datePipe.transform(new Date(this.startDate), 'dd MMM');
    this.CheckForDayEvents();

   }

   GetToday()
   {
    this.dates = [];
    this.startDate = new Date();
    this.startDateStr = this.datePipe.transform(new Date(this.startDate), 'dd MMM');
    this.monthStr = this.datePipe.transform(new Date(this.startDate), 'MMMM');
    if(this.showweek)
    {
      this.getDatesForWeek();

    }
    if(this.showday)
    {
      this.CheckForDayEvents();

    }
   }


  ShowDay()
  {
   this.startDate = new Date();
   this.CheckForDayEvents();
    this.startDateStr = this.datePipe.transform(new Date(this.startDate), 'dd MMM');
    this.showday = true;
    this.showweek = false;
    this.showmonth = false;
  }
  ShowWeek()
  {
    
    this.startDate = new Date();
    this.monthStr = this.datePipe.transform(new Date(this.startDate), 'MMMM');
    this.getDatesForWeek();
  
    this.showday = false;
    this.showweek = true;
    this.showmonth = false;

  }
  ShowMonth()
  {
    this.showday = false;
    this.showweek = false;
    this.showmonth = true;
    this.generateCalendarDays(this.monthIndex );
  }

  closeReset()
  {
    this.displayEvent = false;
   this.displayNotAvailable = false;
    this.selectedOrders = [];
  }

  DisplayEventsWeek()
  {
    this.displayEvent = true;
    this.CheckForDayEvents
  }

  CheckForDayEvents()
  {
    this.ordersDay = [];
    this.notAvailbleDay = [];
    let value = new Date(this.startDate).toDateString();
    let valueNot = this.datePipe.transform(new Date(this.startDate), 'dd MMM yyyy')
  

    for(var i = 0; i < this.orders.length; i++)
    {
      let d =  new Date(this.orders[i].OrderStartDate).toDateString();

      if(d == value)
      {
       
        this.ordersDay.push(this.orders[i]);
      }
    }


    for(var i = 0; i < this.notAvailble.length; i++)
    {
      if(this.notAvailble[i].TimeStamp == valueNot)
      {
    
        this.notAvailbleDay.push(this.notAvailble[i]);
      }
    }
    
    if(this.ordersDay.length > 1)
    {
      this.ordersDay.sort((a, b) => new Date(a.OrderStartDate).getTime() - new Date(b.OrderStartDate).getTime());

    }

  }
  GetNotAvaiable()
  {

  }

  setNotAvailable(value: string)
  {
    this.notAvailbleDay = [];

    let valueNot = this.datePipe.transform(new Date(value), 'dd MMM yyyy')

    for(var i = 0; i < this.notAvailble.length; i++)
    {
      if(this.notAvailble[i].TimeStamp == valueNot)
      {
    
        this.notAvailbleDay.push(this.notAvailble[i]);
      }
    }
    
    this.displayNotAvailable = true;
  }

  DeleteNot(id: string)
  {
    this._order.DeleteItem(id).subscribe({
      next: nAvailable => {
        console.log(JSON.stringify(nAvailable) + 'nAvailable removed');
        this.message = "not avail removed";
          
         },
      error: (err) => this.message = err
    });

    this.displayNotAvailable = false;
    this.deleteNA.emit();

  }

  

  getTimeDifference(timestamp1: string, timestamp2: string): string {
    let returnString = '';
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());

    const minutesDiff = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hoursDiff = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let timeDiffStr = "";

  if (daysDiff === 1) {
    timeDiffStr += "1 day, ";
  } else if (daysDiff > 1) {
    timeDiffStr += `${daysDiff} days, `;
  }

  if (hoursDiff === 1) {
    timeDiffStr += "1 hour, ";
  } else if (hoursDiff > 1) {
    timeDiffStr += `${hoursDiff} hours, `;
  }

  if (minutesDiff === 1) {
    timeDiffStr += "1 minute";
  } else if (minutesDiff > 1) {
    timeDiffStr += `${minutesDiff} minutes`;
  }

  if (timeDiffStr.endsWith(", ")) {
    timeDiffStr = timeDiffStr.slice(0, -2);
  }

  if (timeDiffStr.indexOf(", ") !== -1) {
    const lastCommaIndex = timeDiffStr.lastIndexOf(", ");
    timeDiffStr = timeDiffStr.slice(0, lastCommaIndex) + " and " + timeDiffStr.slice(lastCommaIndex + 2);
  }

  return timeDiffStr;

   
  }




  

}
