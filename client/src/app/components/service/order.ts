export enum EOrderStatus {
    Pendent = 'Pendent',
    Processing = 'Processing',
    Review = 'Review',
    Canceled = 'Canceled', 
    Completed = 'Completed', 
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
  