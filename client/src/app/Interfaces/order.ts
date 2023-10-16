export enum EOrderStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Review = 'Review',
    Canceled = 'Canceled', 
    Completed = 'Completed', 
    Executing = 'Executing', 
  }
  
  export enum EPaymentStatus{
    Pending = 'Pending',
    Declined = 'Declined', 
    Confirmed = 'Confirmed', 
    Refounded = 'Refounded', 
  }
  export interface IPetCategory {
    value: string;
    viewValue: string;
  }

  export interface IServiceCategory {
    value: string;
    viewValue: string;
  }

  export interface IOrderList {
    PetSitterID: number;
    PetOwnerID: number;
    OrderDate: string;
    Description: string;
    OrderDescription:string;
    OrderID: number;
    ServiceID: number;
    Price: string;
    PaymentStatus: string;
    Status: string;
    UserID: number;
    Name: string;
    Surname: string;
    Profile_Pic_URL: string;
    AdressID: number;
    Line_1: string;
    Line_2: string;
    County: string;
    ServiceTitle: string;
    UserTitle: string;
    servicedes: string;
    formatted_date: string;
    OrderStartDate: string;
    OrderEndDate: string;
    
  }
  export interface INotAvailable {
    NotAvailableID: number;
    UserID: number;
    TimeStamp: string;
    Note: string;
  }
  