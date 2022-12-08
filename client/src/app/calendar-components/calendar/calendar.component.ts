import { Component, OnInit } from '@angular/core';
import { CalendarDay, event} from '../../calender-class/cal-class'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
 
  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: string;
  private monthIndex: number = 0;

  displayEvent = false;

  title = '';
  desc = ''; 
  desc2 = '';
  owner ='';

  events: event[];

  ngOnInit(): void {
    this.events = [
      new event(this.addDays(new Date, 1), "test"),
      new event(this.addDays(new Date, 3), "Available"),
      new event(this.addDays(new Date, 6), "Available")
  ]

    this.generateCalendarDays(this.monthIndex);
    
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

    // for (var i = 0; i < this.calendar.length; i++) {

    //       for(let e = 0; e < this.events.length; e++)
    //       {
           
    //         if(this.calendar[i].date == this.events[e].date)
    //         {
    //         this.calendar[i].hasEvent = true;
    //         console.log('test');
    //         }

    //      }
     
    // }

  

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

    this.calendar[16].hasEvent = true;
    this.calendar[16].petOwner = "Jenny Kelly";
    this.calendar[16].eventTitle = "Walk fluffy - 5km";
    this.calendar[16].eventDescription = "Pick up: Sligo"
    this.calendar[16].eventDescription2 = "payment: £35"

    this.calendar[32].hasEvent = true;
    this.calendar[32].petOwner = "John Smith";
    this.calendar[32].eventTitle = "feed Dog";
    this.calendar[32].eventDescription = "Location: Carrick"
    this.calendar[32].eventDescription2 = "payment: £15"
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

  setValues(title: string, desc: string, desc2 : string, owner: string)
  {
    this.displayEvent = true;
    this.title = title;
    this.desc = desc;
    this.desc2 = desc2;
    this.owner = owner;

    

  }

  test()
  {
    console.log(this.calendar);
    console.log(this.events);

  }

}
