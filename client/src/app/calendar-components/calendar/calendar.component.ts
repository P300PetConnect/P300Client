import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { INotAvailable, IOrderList } from 'src/app/components/interfaces/order';
import { CalendarDay, event} from '../../calender-class/cal-class'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
 
  // constructor(private datePipe: DatePipe) {

  // }
  constructor(private datePipe: DatePipe, private router: Router) { 
    this.startDate = new Date();
  }

//pass string as input from component, different for each component, use ngif and have two versions of the calender. 
  public displayMonth: string;
  private monthIndex: number = 0;
  selectedOrders: IOrderList [] = [];
  displayEvent = false;
  
  @Input() orders: IOrderList [] = [];
  @Input() notAvailble: INotAvailable [] = [];
  @Input() componentFlag: string;

  showday = false;
  showweek = false;
  showmonth = false;
  private startDate: Date;
  dates: Date[] = [];


  
  

  public calendar: CalendarDay[] = [];
  picKeyWords: string[] = ["Feed", "Walk", "Accommodation","Mind"] 
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

 

  ngOnInit(): void {
    
    this.generateCalendarDays(this.monthIndex);
    console.log(this.calendar);
    this.getDatesForWeek();
    
  }

  isObjectInArray(value: string): boolean {
   //tests to see if date is in list array
    return this.orders.some(obj => obj.formatted_date === value);
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
    value = this.datePipe.transform(new Date(value), 'dd MMM yyyy');
    for(var i = 0; i < this.orders.length; i++)
    {

      if(this.orders[i].formatted_date == value)
      {
        //sets selected order in temp object so we can render the details out on screen
        this.selectedOrders.push(this.orders[i]);
      }
    }
    
    console.log(JSON.stringify(this.selectedOrders));
    this.displayEvent = true;
   
  }
  ChangeRoute()
  {
    this.router.navigate(['/orders']);

  }

  closeReset()
  {
    this.displayEvent = false;
    //clear selected orders
    this.selectedOrders = [];
  }



  getDatesForWeek() {

    const endDate = new Date(this.startDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    let currentDate = this.startDate;
    while (currentDate < endDate) {
      this.dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
   

  }


  getNextWeek(): void {
   this.dates = [];
   this.getDatesForWeek();
  }

  getLastWeek(): void {
    this.dates = [];

     this.startDate.setDate(this.startDate.getDate() - 14);
    
   
     this.getDatesForWeek();
   }

   GetToday()
   {
    this.dates = [];
    this.startDate = new Date();
    this.getDatesForWeek();

   }


  ShowDay()
  {
   this.startDate = new Date();
    this.showday = true;
    this.showweek = false;
    this.showmonth = false;
  }
  ShowWeek()
  {
    this.showday = false;
    this.showweek = true;
    this.showmonth = false;

    this.generateCalendarDays(this.monthIndex);
  }
  ShowMonth()
  {
    this.showday = false;
    this.showweek = false;
    this.showmonth = true;
  
   
    this.generateCalendarDays(this.monthIndex );
  }

  GetNextWeek()
  {
      this.generateCalendarDays(this.monthIndex);
  }



  

}
