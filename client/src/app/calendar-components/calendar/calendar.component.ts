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
  constructor(private datePipe: DatePipe, private router: Router) { }

//pass string as input from component, different for each component, use ngif and have two versions of the calender. 
  public displayMonth: string;
  private monthIndex: number = 0;
  selectedOrder: IOrderList;
  displayEvent = false;
  
  @Input() orders: IOrderList [] = [];
  @Input() notAvailble: INotAvailable [] = [];

  @Input() componentFlag: string;

  

  public calendar: CalendarDay[] = [];
  picKeyWords: string[] = ["Feed", "Walk", "Accommodation","Mind"] 
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

 

  ngOnInit(): void {
    
    this.generateCalendarDays(this.monthIndex);
    console.log(this.calendar);
    
  }

  isObjectInArray(value: string): boolean {
   //tests to see if date is in list array
    return this.orders.some(obj => obj.formatted_date === value);
  }

  isObjectInArray2(value: string): boolean {
    //tests to see if date is in notAvailable array
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

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }

//still hardcoded for dates no available
    this.calendar[41].notAvailable = true;
    this.calendar[34].notAvailable = true;
    this.calendar[27].notAvailable = true;
    this.calendar[20].notAvailable = true;
    this.calendar[13].notAvailable = true;
    this.calendar[6].notAvailable = true;

    this.calendar[40].notAvailable = true;
    this.calendar[33].notAvailable = true;
    this.calendar[26].notAvailable = true;
    this.calendar[19].notAvailable = true;
    this.calendar[12].notAvailable = true;
    this.calendar[5].notAvailable = true;

   
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
        this.selectedOrder = this.orders[i];
      }
    }
    
    this.displayEvent = true;
   
  }
  ChangeRoute()
  {
    this.router.navigate(['/orders']);

  }



  

}
