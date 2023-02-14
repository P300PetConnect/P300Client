import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ModalConfig } from './components/interfaces/modal.config';
//import Amplify from 'aws-amplify';
//import awsExports from 'src/aws-exports';
import { Router } from '@angular/router';
import { LoaderService } from './components/service/loader.service';
// import { AuthenticatorService } from '@aws-amplify/ui-angular';
// import Amplify from 'aws-amplify';
// import awsExports from 'src/aws-exports';
import { DayService, WorkWeekService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { EventSettingsModel, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
// import { scheduleData } from './datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // providers: [DayService, WeekService, MonthService, AgendaService, TimelineMonthService],
  // template: `<ejs-schedule width='100%' height='550px' [selectedDate]="selectedDate"
  // [eventSettings]="eventSettings" ></ejs-schedule>`

})

export class AppComponent {

  isAutenticated: boolean; 
  constructor(public _authenticator: AuthenticatorService,public router: Router, public loaderService: LoaderService) {
    if(_authenticator){
      console.log(router); 
    }
  }



}
