export enum EOrderStatus {
    Pendent = 'Pendent',
    Processing = 'Processing',
    Review = 'Review',
    Canceled = 'Canceled', 
    Delivered = 'Delivered', 
  }
  
  export enum EPaymentStatus{
    Pendent = 'Pendent',
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
    
  }
  export interface INotAvailable {
    NotAvailableID: number;
    UserID: number;
    TimeStamp: string;
    Note: string;
  }
  