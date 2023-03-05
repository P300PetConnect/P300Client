import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DayService, WorkWeekService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { EventSettingsModel, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { INotAvailable, IOrderList } from '../interfaces/order';
import { OrderService } from '../service/order.service';
import {
  ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventRenderedArgs, RenderCellEventArgs,
   GroupModel, ResizeService, TimeScaleModel, WorkHoursModel, View
} from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-cal2',
  //templateUrl: './cal2.component.html'
  styleUrls: ['./cal2.component.scss'],
  providers: [DayService, WeekService, MonthService, AgendaService, TimelineMonthService,DatePipe,TimelineViewsService, ResizeService],
  template: `<ejs-schedule width='100%' height='550px' 
  [eventSettings]="eventSettings" (dataBound)="onDataBound($event)" (eventRendered)="onEventRendered($event)" ></ejs-schedule>`
  
//integrate with my backend, 
//fix local storage zip

})
export class Cal2Component implements OnInit {
  constructor(private datePipe: DatePipe, private router: Router,private _order: OrderService) { }

  public data: object[] = [{
    Id: 1,
    Subject: 'Meeting',
    type : 'off',
    StartTime: new Date(2023, 1, 15, 10, 0),
    EndTime: new Date(2023, 1, 15, 12, 30)
  }];


  public eventSettings: EventSettingsModel;
  picKeyWords: string[] = ["Feed", "Walk", "Accommodation","Mind"] 
  @Input() orders: IOrderList [] = [] ;
  @Input() notAvailble: INotAvailable [] = [];
  message: any;

  orderst:IOrderList[] = [];
  not:INotAvailable[] = [];
  eventColor: string = '#1976d2'; 

  ngOnInit(): void {
   this.GetOrders(36);
   this.GetnotAvailable(43)
 
  }
  GetnotAvailable(id: number)
  {
    this._order.getNotAvailable(id).subscribe(data => {
      this.not = data;
      //alert(JSON.stringify(this.not.length))

      for(let i = 0; i < this.not.length; i++)
      {
        let start =this.not[i].TimeStamp;
        let date = new Date(start);
        date.setDate(date.getDate() + 1);
        let newTimestampString = date.toString();

        this.data.push({
       
          Id: this.not[i].NotAvailableID,
          Subject: this.not[i].Note,
          Type: 'Meeting',
          allowDeleting: false,
          allowEditing: false,
          StartTime: start,
          EndTime: newTimestampString,
          Color: '#fc0703', // Set the color property for the event
          imageUrl: 'https://via.placeholder.com/150'
  
        })
        this.eventSettings  = {
          dataSource: this.data,
     
        }
        
      }
    });
  }

  GetOrders(id: number)
  {
    this._order.getOrdersList(id).subscribe(data => {
      this.orderst = data;
    //  alert(JSON.stringify(this.data))
      for(let i = 0; i < this.orderst.length; i++)
      {
        this.data.push({
          Id: this.orderst[i].OrderID,
          Type: 'Appointment',
          Subject: this.orderst[i].Description,
          StartTime: this.orderst[i].formatted_date,
          EndTime: this.orderst[i].formatted_date,
          Color: '#07eb48'
  
        })
        this.eventSettings  = {
          dataSource: this.data
        }
        
      }
   
    });
  }

  onDataBound(args: any) {
    // Iterate through the events and set the color and other settings based on the event data or other conditions
    args.data.forEach((event: any) => {
      if (event.type === 'Meeting') {
        event.color = '#1976d2';
        event.textColor = '#ffffff';
      } else if (event.type === 'Appointment') {
        event.color = '#dc3545';
        event.textColor = '#ffffff';
      }
    });
  
  }

  onEventRendered(args: any) {
    let event = args.data;
    args.element.style.backgroundColor = event.Color;
    args.element.style.color = 'white'; // Set the text color to white

  }

 

  

 

}
