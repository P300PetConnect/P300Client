import { Component, OnInit } from '@angular/core';
import { DayService, WorkWeekService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { EventSettingsModel, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calendar-v2',
  // templateUrl: './calendar-v2.component.html',
  styleUrls: ['./calendar-v2.component.scss'], 
  providers: [DayService, WeekService, MonthService, AgendaService, TimelineMonthService],
  template: `<ejs-schedule width='100%' height='550px' [selectedDate]="selectedDate"
  [eventSettings]="eventSettings" ></ejs-schedule>`

})
export class CalendarV2Component implements OnInit {
  public data: object[] = [{
    Id: 2,
    Subject: 'Paris',
    StartTime: new Date(2023, 2, 15, 10, 0),
    EndTime: new Date(2023, 2, 15, 12, 30)
}];
public selectedDate: Date = new Date(2023, 2, 15);
public eventSettings: EventSettingsModel = {
    dataSource: this.data
};
  constructor() { }

  ngOnInit(): void {
  }

}
