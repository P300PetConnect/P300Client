export interface CalClass {
}


export class CalendarDay {
    public date: Date;
    public title: string;
    public isPastDate: boolean;
    public isToday: boolean;
    public hasEvent: boolean;
    public petOwner: string;
    public eventTitle: string;
    public eventDescription : string;
    public eventDescription2 : string;
    public notAvailable : boolean;
  
    constructor(d: Date) {
      this.date = d;
      this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
      this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
    }
  
  }

export class event
{
  public date: Date;
  public title: string;

  constructor(date: Date, title: string)
  {
    this.date = date;
    this.title = title;

  }

}



