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
  [eventSettings]="eventSettings"  (eventRendered)="onEventRendered($event)" 
  >
  <e-resources>
    <e-resource field='organizer' title='Organizer'></e-resource>
  </e-resources>
		
    </ejs-schedule>`
  


})
export class Cal2Component implements OnInit {

  organizer: GroupModel = { resources: ["organizer"], allowGroupEdit: true };

  constructor(private datePipe: DatePipe, private router: Router,private _order: OrderService) { }

  public data: object[] = [];


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
          group: 'Test',
         
          allowDeleting: false,
          allowEditing: false,
          StartTime: start,
          EndTime: newTimestampString,
          Color: '#fc0703', // Set the color property for the event
       
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
   
      for(let i = 0; i < this.orderst.length; i++)
      {
        this.data.push({
          Id: this.orderst[i].OrderID,
          Subject: this.orderst[i].Description,
          StartTime: this.orderst[i].formatted_date,
          EndTime: this.orderst[i].formatted_date,
          Color: '#07eb48',
          Location: this.orderst[i].Line_2 + ', ' + this.orderst[i].County ,
          Organizer: 'John Doe'
  
        })
        this.eventSettings  = {
          dataSource: this.data
        }
         
      }
   
    });
  }



  onEventRendered(args: any) {
    let event = args.data;
    args.element.style.backgroundColor = event.Color;
    args.element.style.color = 'white'; // Set the text color to white

  }

 

  

 

}
