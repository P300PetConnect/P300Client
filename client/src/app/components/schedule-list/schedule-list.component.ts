import { Component, Input, OnInit } from '@angular/core';
import { IOrderList } from '../interfaces/order';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  constructor() { }
  @Input() order: IOrderList;
  ngOnInit(): void {
  }
 
}
